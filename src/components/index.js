import React from 'react';
import MainPage from '../pages/MainPage';
import AuthStore from '../store/AuthStore';
import {Link} from 'react-router';
var Masonry = require('masonry-layout');
require('../less/scrollBar.css');
require('../scripts/jquery.scrollbar.min.js');
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import {Point, MyPoint , EventPoint} from './Point';


import Actions from '../actions/Actions';
var ActionTypes = require("../constants/ActionTypes");

function getState() {
    return {
        user: AuthStore.userInfo(),
        leftBarShow: false,
        windowHeight: 0,
        windowWidth: 0
    };
}

export default class app extends React.Component {
    constructor(props){
        super(props);
        this.state = getState();
    }
    handleClick(e){
        e.preventDefault();
        var timeOut = 0;
        if(this.state.leftBarShow){
            timeOut = 1000;
            $('.leftBar').removeClass('bounceInLeft').addClass('bounceOutLeft');
        }
        setTimeout(() => {
            this.setState({
                leftBarShow: !this.state.leftBarShow,
                windowHeight: $(window).height(),
                windowWidth: $(window).width()
            }, () => {
                var grid = document.querySelector('.grid');
                var msnry = new Masonry( grid, {
                    // options...
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-item',
                    transitionDuration: 10
                });
            })
        },timeOut)
        setTimeout(function () {
            $('#container').perfectScrollbar();
        },100)
    }
    
    componentDidMount() {
        var self = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            self.setState({
                latitude: position.coords.latitude, // 53.195947,
                longitude: position.coords.longitude //45.010325
            })
        });
        Actions.send(ActionTypes.GET_EVENTS);
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
            {
                this.state.leftBarShow && <div id="container" className='leftBar animated bounceInLeft' style={{ width: this.state.windowWidth < 768 ? this.state.windowWidth  : 300, height: this.state.windowHeight - 60, background: '#fff', position: 'absolute', top: 60, left: 0, zIndex: 100}}>
                    <div>
                        <div className="myAvatar" style={{width: 80, height: 80, float: 'left', margin: 10, borderRadius: '50%', overflow: 'hidden'}}>
                            <img style={{width: 80, height: 80}} src={this.state.user.data.avatar} alt=""/>
                            <div>
                                <span className="glyphicon glyphicon-camera"></span>
                            </div>
                        </div>
                        <h4 style={{marginTop: 20,  float: 'left', marginLeft: 10}}>
                            {`${this.state.user.data.last_name} ${this.state.user.data.first_name}`}
                            <a href="" style={{fontSize: 14, marginLeft: 10}}><span className="glyphicon glyphicon-pencil"></span></a>
                        </h4>
                        <div>
                            <h5 style={{display: 'inline-block', marginLeft: 10}} className="level">Level</h5>
                            <div className="level-number" style={{display: 'inline-block'}}>7</div>
                            <p style={{display: 'inline-block', marginLeft: 10}}>791 xp</p>
                            <p style={{display: 'inline-block',  marginLeft: 10}}>9 XP to reach Level 8</p>
                        </div>
                        <div style={{clear: 'both'}}></div>
                    </div>
                    <div>
                        <div className="photo-gallery grid">
                            <h3>Latest photos</h3>
                            <div className="add-photo">
                                <span className="glyphicon glyphicon-camera"></span>
                            </div>
                            <div style={{position: 'relative'}}>
                                {
                                    this.state.user.data.photos.split(';').map((i, index) => {
                                        return <img key={index} src={i} alt="" className="grid-item"/>
                                    })
                                }
                            </div>
                        </div>
                        <div className="map" style={{marginLeft: 10, marginTop: 140}}>
                            <h3>Where I've been</h3>
                            <Map
                                width={290}
                                height={300}
                                onAPIAvailable={function () { console.log('API loaded'); }}
                                center={[this.state.latitude, this.state.longitude]}
                                zoom={17} >
                                <MyPoint lat={this.state.latitude} lon={this.state.longitude} avatar={'./img/avatar3.jpg'} />
                            </Map>
                        </div>
                        <div style={{padding: 5}} className="achievements">
                            <h3>My achievements</h3>
                            <img alt="" src="./img/img1.png"/>
                            <img alt="" src="./img/img2.png"/>
                            <img alt="" src="./img/img3.png"/>
                            <img alt="" src="./img/img4.png"/>
                            <img alt="" src="./img/img5.png"/>
                        </div>
                    </div>
                </div>
            }   
            {this.props.children}
        </div>
    }
}