import React from 'react';
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import {Point, MyPoint} from '../Point'

export default class Maps extends React.Component{
    constructor(props) {
        super(props);
        this.state ={
            popupOpen: false
        }
    }
    handleClick(){
        this.setState({popupOpen: !this.state.popupOpen})
    }
    render(){
        return <div style={{position: 'absolute', width: '100vw', height: '100vh'}}>
            <Maps style={{widht: 1000}} onAPIAvailable={function () { console.log('API loaded'); }} center={[55.754734, 37.583314]} zoom={10} onClick={() => {this.setState({popupOpen: false})}}>
                <Point lat={55.783379} lon={37.775575} avatar={'./img/avatar.jpg'} />
                <Point lat={55.583379} lon={37.575575} avatar={'./img/avatar2.jpg'} />
                <MyPoint lat={55.6583379} lon={37.675575} avatar={'./img/avatar3.jpg'} />
            </Maps>
        </div>
    }
}