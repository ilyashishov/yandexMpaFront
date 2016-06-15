require('./less/style.less');

import React from 'react';
import ReactDom from 'react-dom';
import Header from './components/Header';
import {Router, Route, Redirect, Link, browserHistory} from 'react-router';
import app from './components';
import Chat from './pages/ChatPage'
import MainPage from './pages/MainPage';
window.$ = window.jQuery = require('jquery');
import AuthStore from './store/AuthStore';
import Actions from './actions/Actions';
var ActionTypes = require("./constants/ActionTypes");


import NotFoundPage from './pages/PageNotFound';
import LoginPage from './pages/LoginPage';

class App extends React.Component {
	requireAuth(nextState, replace) {
		var self = this;
		if (!!localStorage.token) {
			Actions.send(ActionTypes.GET_CURRENT_USER, {}, function (res) {
				if(!res.ok){
					delete localStorage.token;
					self.requireAuth();
				}
			});
		} else {
			replace({
				pathname: '/login',
				state: {nextPathname: nextState.location.pathname}
			});
		}
	}

	requireNotAuth(nextState, replace) {
		if (!!localStorage.token) {
			replace({
				pathname: '/map',
				state: {nextPathname: nextState.location.pathname}
			});
		}
	}
    render() {
        return <Router history={browserHistory}>
				<Route path="login" component={LoginPage} onEnter={this.requireNotAuth}/>
				<Route path="/" component={app} onEnter={this.requireAuth}>
					<Route path="map" component={MainPage}/>
					<Route path="test" component={Header}/>
					<Route path="chat" component={Chat} />
				</Route>
				<Route path="*" component={NotFoundPage}/>
			</Router>;
    }
}

ReactDom.render(<App />, document.getElementById('app'))
