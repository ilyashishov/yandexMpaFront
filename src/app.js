require('./less/style.less');

import React from 'react';
import ReactDom from 'react-dom';
import Header from './components/Header';
import {Router, Route, Redirect, Link, browserHistory} from 'react-router';
import app from './components';

import NotFoundPage from './pages/PageNotFound';
import LoginPage from './pages/LoginPage';

class App extends React.Component {
	requireAuth(nextState, replace) {
		if (!!localStorage.fastMfToken) {
			// Actions.send(ActionTypes.GET_CURRENT_USER);
		} else {
			replace({
				pathname: '/login',
				state: {nextPathname: nextState.location.pathname}
			});
		}
	}

	requireNotAuth(nextState, replace) {
		if (!!localStorage.fastMfToken) {
			replace({
				pathname: '/',
				state: {nextPathname: nextState.location.pathname}
			});
		}
	}
    render() {
        return <Router history={browserHistory}>
				<Route path="login" component={LoginPage} onEnter={this.requireNotAuth}/>
				<Route path="/" component={app} onEnter={this.requireAuth}>
					<Route path="test" component={Header}/>
				</Route>
				<Route path="*" component={NotFoundPage}/>
			</Router>;
    }
}

ReactDom.render(<App />, document.getElementById('app'))
