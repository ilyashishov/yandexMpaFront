import React from 'react';
import {Link} from 'react-router'
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import {Point, MyPoint , EventPoint} from '../../components/Point';
import AuthStore from '../../store/AuthStore';

var Masonry = require('masonry-layout');

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
            windowWidth: 0,
            eventsData: AuthStore.getEvents(),
            eventInfoShow: false
        }
    }
    componentDidMount(){
        var self = this;
        navigator.geolocation.getCurrentPosition(function(position) {
            self.setState({
                latitude: 53.195947,//position.coords.latitude,
                longitude: 45.010325//position.coords.longitude
            })
        });
        this.setState({
            rightBarHeight: $(window).height() - 60,
            mapHeight: $(window).height(),
            windowWidth: $(window).width(),
            showGalleryWidth: $(window).width() - 300
        });
        AuthStore.addChangeListener(this._onChange.bind(this));
    }
    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        this.setState({
            eventsData: AuthStore.getEvents()
        });
    }

    handleClick(){
        this.setState({popupOpen: !this.state.popupOpen})
    }
    openInfo(data){
        this.setState({
            rightBarShow: true,
            eventInfoShow: false,
            data: data
        })
        var grid2 = document.querySelector('.grids');
        var msnry2 = new Masonry( grid2, {
            // options...
            itemSelector: '.grid',
            columnWidth: '.grid',
            transitionDuration: 10
        });

    }
    openEventInfo(data){
        this.setState({
            event: data,
            eventInfoShow: true,
            rightBarShow: false
        })
    }
    render() {
        var data1 = {
            lastName: 'Алина',
            firstName: 'Савченко',
            avatar: './img/avatar.png',
            photos: ['https://pp.vk.me/c630626/v630626524/29506/ebEVGcIWaC4.jpg', 'https://pp.vk.me/c629316/v629316524/3157f/r5frTb2Amvg.jpg'],
            level: 10,
            id: 3,

        }
        var data2 = {
            lastName: 'Дарья',
            firstName: 'Палагина',
            avatar: './img/avatar2.png',
            photos: ['https://pp.vk.me/c622929/v622929922/41a5e/LWblWA6JqVA.jpg', 'https://pp.vk.me/c625320/v625320922/3b377/J3KFwbW7k9U.jpg' ,'https://pp.vk.me/c620330/v620330922/10fc8/CojM98ueuL0.jpg'],
            level: 13,
            id: 5,

        }
        if(!this.state.eventsData){
            return null;
        }
        return <div style={{overflow: 'hidden', position: 'relative', width: '100%', height: this.state.rightBarHeight-1}}>
            <div style={{top: 0, position: 'absolute', width: '100vw', height: this.state.mapHeight}}>
                <Map
                    style={{}}
                    onAPIAvailable={function () { console.log('API loaded'); }}
                    center={[this.state.latitude, this.state.longitude]}
                    zoom={17} onClick={() => {
                        $('.rightBar').removeClass('bounceInRight').addClass('bounceOutRight');
                        setTimeout(() => {this.setState({rightBarShow: false, eventInfoShow: false})},1000)
                    }}>
                    {
                        this.state.eventsData.map((i, index)=>{
                            return <EventPoint
                                openEventInfo={this.openEventInfo.bind(this, i)}
                                key={index}
                                lat={i.position[0]}
                                lon={i.position[1]}
                                avatar={i.img} />
                        })
                    }
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
                            <Link to={"/chat/" + this.state.data.id} style={{margin: 5, marginLeft: 0}}>Message</Link>
                            <Link to="/friends/add/1" style={{margin: 5, marginLeft: 10}}>Add to Friends</Link>
                        </div>
                    </div>
                    <div style={{clear: 'both'}}></div>
                    <div className="photo-gallery grids">
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
                                                src={i} alt="" className="grid"/>
                                })
                            }
                        </div>
                    </div>
                </div>
            }
            {
                this.state.eventInfoShow &&
                <div className='rightBar animated bounceInRight' style={{ width: this.state.windowWidth < 768 ? this.state.windowWidth  : 300, height: "100%", background: '#fff', position: 'absolute', top: 0, right: 0, zIndex: 100}}>
                    <div>
                        <img src={this.state.event.img} alt="" style={{width: '100%', heigth: 'auto'}}/>
                    </div>
                    <div style={{clear: 'both'}}></div>
                    <div style={{padding: 5}}>
                        <h3>{this.state.event.title}</h3>
                        <div style={{position: 'relative'}}>
                            <h5>{this.state.event.desciption}</h5>
                        </div>
                        <br/>
                        <p style={{color: '#666', float: 'left', fontStyle: 'italic'}  }>{this.state.event.dateTime}</p>
                        <p style={{color: '#666', float: 'right', fontStyle: 'italic'}  }>{this.state.event.address}</p>
                        <div style={{clear: 'both'}}></div>
                        <div>
                                <a href="" className="btn btn-primary col-md-12 text-center" >I'm going! onClick=</a>
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
