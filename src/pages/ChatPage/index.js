require('./Chat.less');
import React from 'react';
import ReactDOM from 'react-dom';
import request from '../../utils/request'
import _ from 'lodash';

export default class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            messages: []
        }
    }
    componentDidUpdate(){
        $('.messages').scrollTop($('.messages').prop('scrollHeight'));

    }
    componentDidMount(){

        var self = this;
        request.post('/getMessages')
            .success(function (res) {
                self.setState({messages: res})
            })
            .error(function () {
            })
            .always(function () {
                // userLoading = false;
            })
            .send();
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
            console.info('Получены данные ');
            var data = JSON.parse(event.data)
            console.log(data);
            self.setState({
                messages: data
            });
        };

        socket.onerror = function(error) {
            console.error(error.message);
        };
    }
    handleClick(e){
        var self = this;
        e.preventDefault();
        var value = ReactDOM.findDOMNode(this.refs.message_form).value;
        if(value){
            request.get(`/ws?id=${localStorage.token}&mes=${value}`)
                .success(function (res) {
                    console.log(res);
                    ReactDOM.findDOMNode(self.refs.message_form).value = '';
                })
                .error(function () {
                })
                .always(function () {
                    // userLoading = false;
                })
                .send();
        }
        return false;
    }
    render(){
        return <div className="Chat-component">
            <div className="messages">
                {this.state.messages.map(function (i,index) {
                    if(i.id == localStorage.token){
                        return (<p key={index} className="from">{i.text}</p>)
                    }else{
                        return (<p key={index} className="to">{i.text}</p>)
                    }
                })}
            </div>
            <div className="message_write">
                <a href="#" onClick={this.handleClick.bind(this)} className="btn btn-primary message-send">Enter</a>
                <div className="form-group" style={{margin: 0}}>
                    <textarea ref="message_form"textarea className="form-control" name="" id="" cols="30" rows="10"></textarea>
                </div>
            </div>
        </div>
    }
}