import request from '../utils/request';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';
import Store from './Store';

var chatsList = '';

function getHatsList() {
    request.post('/chats/list', {hash: localStorage.token})
        .success(function (res) {
            chatsList = res;
            ChatsStore.emitChange();
        })
        .send();
}


var ChatsStore = _.extend({}, Store, {
    getChatsList: function () {
        return chatsList;
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case ActionTypes.GET_HCATS_LIST:
            getHatsList();
            return true;
        default:
            return true;
    }

});

module.exports = ChatsStore;
