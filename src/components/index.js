import React from 'react';
import MainPage from '../pages/MainPage';
import AuthStore from '../store/AuthStore';
import {Link} from 'react-router';

function getState() {
    return {
        user: AuthStore.userInfo()
    };
}

export default class app extends React.Component {
    constructor(props){
        super(props);
        this.state = getState();
    }
    handleClick(e){
        e.preventDefault();
    }
    
    componentDidMount() {
        AuthStore.addChangeListener(this._onChange.bind(this));
    }
    
    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onChange.bind(this));
    }
    
    _onChange() {
        this.setState(getState());
    }
    
    render() {
        if(!this.state.user.data){
            return null
        }
        return <div>
            <header style={{position: 'relative',height: 60, background: '#F9F9F9', zIndex: 100}}>
                <div className="pull-left">
                    <a href="" onClick={this.handleClick.bind(this)} style={{fontSize: 30, marginTop: 10, marginLeft: 20, display: 'inline-block'}}><span className="glyphicon glyphicon-align-justify"></span></a>
                </div>
                <div className="pull-right col-md-2 col-xs-7 col-sm-4" style={{margin: 10}}>
                    <Link to='/chats' style={{fontSize: 22, float: 'left', margin: 5}}><span className="new-message animated infinite pulse glyphicon glyphicon-envelope"><span>1</span></span></Link>
                    <h4 className="pull-right"><a href="/map">{`${this.state.user.data.last_name} ${this.state.user.data.first_name}`}</a></h4>
                </div>
            </header>
            {this.props.children}
        </div>
    }
}