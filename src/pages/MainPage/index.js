import React from 'react';
import {Link} from 'react-router'
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import {Point, MyPoint} from '../../components/Point';
import _ from 'lodash';

// var yandexMap = require('../../utils/yandexMap');

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            popupOpen: false,
            rightBarShow: false,
            rightBarHeight: 0,
            mapHeight: 1
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
            mapHeight: $(window).height()
        })
    }
    handleClick(){
        this.setState({popupOpen: !this.state.popupOpen})
    }
    openInfo(){
        this.setState({
            rightBarShow: true
        })
    }
    render() {
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
                    <Point openInfo={this.openInfo.bind(this)} lat={this.state.latitude + 0.001} lon={this.state.longitude - 0.001} avatar={'./img/avatar.jpg'} />
                    <Point openInfo={this.openInfo.bind(this)} lat={this.state.latitude - 0.0005} lon={this.state.longitude + 0.0003} avatar={'./img/avatar2.jpg'} />
                    <MyPoint lat={this.state.latitude} lon={this.state.longitude} avatar={'./img/avatar3.jpg'} />
                </Map>
            </div>
            {
                this.state.rightBarShow &&
                <div className='rightBar animated bounceInRight' style={{width: 300, height: "100%", background: '#fff', position: 'absolute', top: 0, right: 0}}>

                </div>
            }
        </div>
    }
}
