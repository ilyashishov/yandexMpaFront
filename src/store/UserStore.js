import request from '../utils/request';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';
import Store from './Store';
import Actions from '../actions/Actions';

let usersList;

function userEdit(data){
    request.post('/user/edit', {lastName: data.lastName, firstName: data.firstName, hash: localStorage.token})
        .success(function (res) {
            if(res.ok){
                Actions.send(ActionTypes.GET_CURRENT_USER, {}, ()=>{});
            }
        })
        .send();
}

function userPositionUpdate(data){
    request.post('/user/position/update', {latitude: data.latitude, longitude: data.longitude, hash: localStorage.token})
        .success(function (res) {
           console.log(res);
        })
        .send();
}

function users() {
    request.get('/users')
        .success(function (res) {
            usersList = res;
            UserStore.emitChange();
        })
        .send();
}

var UserStore = _.extend({}, Store, {
    getUsers: function () {
        return usersList;
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case ActionTypes.GET_USERS:
            users()
            return true;
        case ActionTypes.USER_EDIT:
            userEdit(action)
            return true;
        case ActionTypes.USER_POSITION_UPDATE:
            userPositionUpdate(action);
            return true;
        default:
            return true;
    }

});

module.exports = UserStore;
