import React from 'react';
import {Marker, MarkerLayout} from 'yandex-map-react';
import Point from './Point';

export default class MyPoint extends Point {
    constructor(props) {
        super(props);
        this.state ={
            popupOpen: false
        }
    }

    handleClick(){
        this.setState({popupOpen: !this.state.popupOpen})
    }

    render() {
        return <Marker lat={this.props.lat} lon={this.props.lon} onClick={this.handleClick.bind(this)}>
            <MarkerLayout>
                <div style={{position: 'relative'}}>
                    <div style={{borderRadius: '50%', overflow: 'hidden', width: 60, height: 60, boxShadow: '0px 0px 5px rgba(0,0,0,.5)'}}>
                        <img style={{width: 70, height: 70}} src={this.props.avatar}/>
                    </div>
                    {
                        this.state.popupOpen &&
                        <div className="map_popup">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        </div>
                    }
                </div>
            </MarkerLayout>
        </Marker>
    }
}
