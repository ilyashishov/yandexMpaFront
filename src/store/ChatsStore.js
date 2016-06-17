import request from '../utils/request';
import AppDispatcher from '../dispatcher/AppDispatcher';
import {EventEmitter} from 'events';
import ActionTypes from '../constants/ActionTypes';
import _ from 'lodash';
import Store from './Store';

var chatsList = '', messagesToChat = '';

function getHatsList() {
    request.post('/chats/list', {hash: localStorage.token})
        .success(function (res) {
            chatsList = res;
            ChatsStore.emitChange();
        })
        .send();
}

function getMessagesToChat(id) {
    request.post('/chat/messages', {chat_id: id})
        .success(function (res) {
            messagesToChat = res;
            ChatsStore.emitChange();
        })
        .send();
}

function sendMessage(data) {
    console.log(data);
    request.post('/chat/message/new', {
            chat_id: data.chat_id,
            user_id: data.user_id,
            text: data.text,
            date: data.date
        })
        .success(function (res) {

        })
        .send();
}


var ChatsStore = _.extend({}, Store, {
    getChatsList: function () {
        return chatsList;
    },

    getMessages: function () {
        return messagesToChat;
    }
});

AppDispatcher.register(function (payload) {
    var action = payload.action;
    switch (action.actionType) {
        case ActionTypes.GET_HCATS_LIST:
            getHatsList();
            return true;
        case ActionTypes.GET_MESSAGES_TO_CHAT:
            getMessagesToChat(action.chat_id);
            return true;
        case ActionTypes.SEND_MESSAGE:
            sendMessage(action.data);
            return true;
        default:
            return true;
    }

});

module.exports = ChatsStore;
