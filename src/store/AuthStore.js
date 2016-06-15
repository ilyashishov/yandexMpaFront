import request from '../utils/request';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';
import Store from './Store';

var _userInfo = '';

function getCurrentUser(callback) {
    request.post('/current', {hash: localStorage.token})
        .success(function (res) {
            _userInfo = res;
            callback(res);
            AuthStore.emitChange();
        })
        .send();
}

function logout() {
    request.post("/logout")
        .success(function () {
            _userLogged = false;
            delete localStorage.fastMfToken;
            // self.context.router.replace('/login')
            location.reload();
        })
        .always(function () {
            _clickLogout = false;
        })
        .send();
}



function login(phoneNumber, callback) {
    request.post('/login', {phoneNumber: phoneNumber})
        .success(function (res) {
            callback(res)
        })
        .send();
}

function loginCode(code, phoneNumber, callback) {
    request.post('/login/code', {code: code, phoneNumber: phoneNumber})
        .success(function (res) {
            callback(res)
        })
        .send();
}

function registration(data, callback) {
    request.post('/registration', {
            phoneNumber: data.phoneNumber,
            lastName: data.lastName,
            firstName: data.firstName,
            dateOfBirth: data.dateOfBirth,
        })
        .success(function (res) {
            callback(res)
        })
        .error(function (err, res) {

        })
        .always(function () {

        })
        .send();
}

var AuthStore = _.extend({}, Store, {
    userInfo: function () {
       return _userInfo
    }


});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case ActionTypes.LOGIN:
            login(action.phoneNumber, action.callback);
            return true;
        case ActionTypes.LOGIN_CODE:
            loginCode(action.code, action.phoneNumber, action.callback);
            return true;
        case ActionTypes.REGISTRATION:
            registration(action, action.callback);
            return true;
        case ActionTypes.GET_CURRENT_USER:
            getCurrentUser(action.callback);
            return true;
        default:
            return true;
    }

});

module.exports = AuthStore;
