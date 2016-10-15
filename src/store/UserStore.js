import request from '../utils/request';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';
import Store from './Store';
import Actions from '../actions/Actions';


function userEdit(data){
    request.post('/user/edit', {lastName: data.lastName, firstName: data.firstName, hash: localStorage.token})
        .success(function (res) {
            if(res.ok){
                Actions.send(ActionTypes.GET_CURRENT_USER, {}, ()=>{});
            }
        })
        .send();
}

var UserStore = _.extend({}, Store, {


});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case ActionTypes.USER_EDIT:
            console.log(action)
            userEdit(action)
        default:
            return true;
    }

});

module.exports = UserStore;
