require('./Chat.less');
require('../../less/perfect-scrollbar.min.css');
require('perfect-scrollbar/jquery');

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import ChatsStore from '../../store/ChatsStore';
import AuthStore from '../../store/AuthStore';

import Actions from '../../actions/Actions';
var ActionTypes = require("../../constants/ActionTypes");




function getState() {
    return  ChatsStore.getMessages();
}


export default class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            messagesHeight: 0,
            userInfo: AuthStore.userInfo(),
            messages: getState()
        }
    }
    componentDidUpdate(){
        $('#container').scrollTop($('#container').prop('scrollHeight'));
    }
    componentDidMount(){
        console.log(234324234);
        Actions.send(ActionTypes.GET_MESSAGES_TO_CHAT, {chat_id: this.props.params.id})
        ChatsStore.addChangeListener(this._onChange.bind(this));
        this.setState({
            messagesHeight: $(window).height() - 60 -130 - 30,
        })
        var self = this;
        var socket = new WebSocket('ws://localhost:8080');

        socket.onopen = function(e) {
            console.info('Соединение установлено.');
        };

        socket.onclose = function(event) {
            if (event.wasClean) {
                console.info('Соединение закрыто чисто');
            } else {
                console.warn('Обрыв соединения'); // например, "убит" процесс сервера
            }
            console.log('Код: ' + event.code + ' причина: ' + event.reason);
        };

        socket.onmessage = function(event) {
            console.info('Получены данные !');
            var data = self.state.messages;
            data.push(JSON.parse(event.data));
            self.setState({
                messages: data
            });
        };

        socket.onerror = function(error) {
            console.error(error.message);
        };

        setTimeout(function () {
            $('#container').perfectScrollbar();
        },100)
    }

    componentWillUnmount() {
        ChatsStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        this.setState(getState());
    }

    handleClick(e){
        var self = this;
        e.preventDefault();
        var value = ReactDOM.findDOMNode(this.refs.message_form).value;
        if(value){
            Actions.send(ActionTypes.SEND_MESSAGE, {data: {
                chat_id: this.props.params.id,
                user_id: this.state.userInfo.data.id,
                text: value,
                date: moment().format('DD.MM.YYYY HH:mm')
            }});
            ReactDOM.findDOMNode(self.refs.message_form).value = '';
        }
        return false;
    }
    render(){
        if(!this.state.messages){
            return null;
        }
        return <div className="Chat-component">
            <div className="scrollbar-macosx" id="container" style={{position: 'relative', height: '55vh'}}>
                    {this.state.messages.map((i,index) => {
                        if(i.user_id == this.state.userInfo.data.id){
                            return (<p key={index} className="from">{i.text}</p>)
                        }else{
                            return (<p key={index} className="to">{i.text}</p>)
                        }
                    })}
                <div style={{clear: 'both'}}></div>
            </div>
            <div className="message_write">
                <a href="#" onClick={this.handleClick.bind(this)} className="btn btn-primary message-send">Enter</a>
                <div className="form-group" style={{margin: 0, padding: 10}}>
                    <textarea ref="message_form"textarea className="form-control" name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>
    }
}