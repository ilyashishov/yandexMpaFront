require('./less/style.less');
import React from 'react';
import ReactDom from 'react-dom';
import Header from './components/Header';
import {Router, Route, Redirect, Link, browserHistory} from 'react-router';
import NotFoundPage from './pages/PageNotFound'
import app from './components'

class App extends React.Component {
    render() {
        return <Router history={browserHistory}>
				<Route path="/" component={app} >
					<Route path="test" component={Header}/>
				</Route>
				<Route path="*" component={NotFoundPage}/>
			</Router>;
    }
}

ReactDom.render(<App />, document.getElementById('app'))
