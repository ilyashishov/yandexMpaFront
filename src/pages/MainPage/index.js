import React from 'react';
import {Link} from 'react-router'
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import {Point, MyPoint} from '../../components/Point';
import _ from 'lodash';
import ReactDOM from 'react-dom';

var Masonry = require('masonry-layout')

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            popupOpen: false,
            rightBarShow: false,
            rightBarHeight: 0,
            mapHeight: 1,
            data: {},
            openGalleryImg: '',
            showGallery: false,
            showGalleryWidth: 0,
            windowWidth: 0
        }
    }
    componentDidMount(){
        var self = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            self.setState({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })
        });
        this.setState({
            rightBarHeight: $(window).height() - 60,
            mapHeight: $(window).height(),
            windowWidth: $(window).width(),
            showGalleryWidth: $(window).width() - 300
        });
    }

    handleClick(){
        this.setState({popupOpen: !this.state.popupOpen})
    }
    openInfo(data){
        this.setState({
            rightBarShow: true,
            data: data
        })
        var grid = document.querySelector('.grid');
        var msnry = new Masonry( grid, {
            // options...
            itemSelector: '.grid-item',
            columnWidth: '.grid-item',
            transitionDuration: 10
        });

    }
    render() {
        var data1 = {
            lastName: 'Алина',
            firstName: 'Савченко',
            avatar: './img/avatar.png',
            photos: ['https://pp.vk.me/c630626/v630626524/29506/ebEVGcIWaC4.jpg', 'https://pp.vk.me/c629316/v629316524/3157f/r5frTb2Amvg.jpg'],
            level: 10,
            id: 1,

        }
        var data2 = {
            lastName: 'Дарья',
            firstName: 'Палагина',
            avatar: './img/avatar2.png',
            photos: ['https://pp.vk.me/c622929/v622929922/41a5e/LWblWA6JqVA.jpg', 'https://pp.vk.me/c625320/v625320922/3b377/J3KFwbW7k9U.jpg' ,'https://pp.vk.me/c620330/v620330922/10fc8/CojM98ueuL0.jpg'],
            level: 13,
            id: 2,

        }
        console.log(this.state.windowWidth)
        return <div style={{overflow: 'hidden', position: 'relative', width: '100%', height: this.state.rightBarHeight-1}}>
            <div style={{top: 0, position: 'absolute', width: '100vw', height: this.state.mapHeight}}>
                <Map
                    style={{}}
                    onAPIAvailable={function () { console.log('API loaded'); }}
                    center={[this.state.latitude, this.state.longitude]}
                    zoom={17} onClick={() => {
                        $('.rightBar').removeClass('bounceInRight').addClass('bounceOutRight');
                        setTimeout(() => {this.setState({rightBarShow: false})},1000)
                    }}>
                    <Point openInfo={this.openInfo.bind(this,data1)} lat={this.state.latitude + 0.001} lon={this.state.longitude - 0.001} avatar={'./img/avatar.png'} />
                    <Point openInfo={this.openInfo.bind(this, data2)} lat={this.state.latitude - 0.0005} lon={this.state.longitude + 0.0003} avatar={'./img/avatar2.png'} />
                    <MyPoint lat={this.state.latitude} lon={this.state.longitude} avatar={'./img/avatar3.jpg'} />
                </Map>
            </div>
            {
                this.state.rightBarShow &&
                <div className='rightBar animated bounceInRight' style={{ width: this.state.windowWidth < 768 ? this.state.windowWidth  : 300, height: "100%", background: '#fff', position: 'absolute', top: 0, right: 0, zIndex: 100}}>
                    <div>
                        <div className="avatar" style={{width: 80, height: 80, float: 'left', margin: 10}}>
                            <img style={{width: 80, height: 80, borderRadius: '50%'}} src={this.state.data.avatar} alt=""/>
                        </div>
                        <h4 style={{display: 'inline-block'}} className="name">{`${this.state.data.lastName} ${this.state.data.firstName}`}</h4>
                        <div>
                            <h5 style={{display: 'inline-block'}} className="level">Level</h5>
                            <div className="level-number">{this.state.data.level}</div>
                        </div>
                        <div style={{marginTop: 5}}>
                            <Link to="/chat/1" style={{margin: 5, marginLeft: 0}}>Message</Link>
                            <Link to="/friends/add/1" style={{margin: 5, marginLeft: 10}}>Add to Friends</Link>
                        </div>
                    </div>
                    <div style={{clear: 'both'}}></div>
                    <div className="photo-gallery grid">
                        <h3>Latest photos</h3>
                        <div style={{position: 'relative'}}>
                            {
                                this.state.data.photos.map((i, index) => {
                                    return <img key={index} onClick={()=>{
                                            this.setState({
                                                showGallery: true,
                                                openGalleryImg: i
                                            })
                                        }}
                                                src={i} alt="" className="grid-item"/>
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            {
                this.state.showGallery && <div onClick={() => {this.setState({showGallery: false})}} className="open-gallery animated pulse" style={{width: this.state.showGalleryWidth}}>
                    <img style={{
                                height: this.state.rightBarHeight > this.state.showGalleryWidth ? 'auto' :  this.state.rightBarHeight - 80,
                                width: this.state.rightBarHeight < this.state.showGalleryWidth ? 'auto' :  this.state.showGalleryWidth - 80,
                                }} src={this.state.openGalleryImg} alt=""/>
                </div>
            }
        </div>
    }
}
