import React from 'react';
import {Marker, MarkerLayout } from 'yandex-map-react';
import Point from './Point';
import Actions from '../../actions/Actions';
var ActionTypes = require("../../constants/ActionTypes");
import AuthStore from '../../store/AuthStore'

function getState() {
    return {
        myAddress: AuthStore.getAddress()
    }
}

export default class MyPoint extends Point {
    constructor(props) {
        super(props);
        this.state = _.merge({popupOpen: false}, getState());

    }

    componentDidMount() {
        Actions.send(ActionTypes.GET_HCATS_LIST);
        AuthStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        AuthStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        this.setState(getState());
    }
    handleClick(){
        Actions.send(ActionTypes.GET_ADDRESS, {latitude: this.props.lat, longitude: this.props.lon});
        this.setState({
            popupOpen: !this.state.popupOpen
        })
    }

    render() {
        return <Marker lat={this.props.lat} lon={this.props.lon} onClick={this.handleClick.bind(this)}>
            <MarkerLayout>
                    <div style={{position: 'relative', height: 68}}>
                    <div style={{width: 5, height: 5, background: '#1A237E', position: 'absolute', left: 27.5, bottom: -5}}></div>
                    <div style={{
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                    width: 60,
                                    height: 60,
                                    boxShadow: '0px 0px 5px rgba(0,0,0,.5)',

                                    }}>
                        <img style={{width: 70, height: 70}} src={this.props.avatar}/>
                    </div>
                    {
                        this.state.popupOpen && this.state.myAddress &&
                        <div className="map_popup">
                            <h5>{this.state.myAddress}</h5>
                            <a href="">I'm here</a> <br/>
                            <a href="">Remember the place</a> <br/>
                            <a href="">Who's next</a>
                        </div>
                    }
                </div>
            </MarkerLayout>
        </Marker>
    }
}
