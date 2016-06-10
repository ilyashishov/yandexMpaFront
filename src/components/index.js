import React from 'react';
import {Link} from 'react-router'
import { Map, Marker, MarkerLayout } from 'yandex-map-react';
import {Point, MyPoint} from './Point'

class app extends React.Component {
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
        return <div>
            <Map style={{widht: 1000}} onAPIAvailable={function () { console.log('API loaded'); }} center={[55.754734, 37.583314]} zoom={10} onClick={() => {this.setState({popupOpen: false})}}>
                <Point lat={55.783379} lon={37.775575} avatar={'./img/avatar.jpg'} />
                <Point lat={55.583379} lon={37.575575} avatar={'./img/avatar2.jpg'} />
                <MyPoint lat={55.6583379} lon={37.675575} avatar={'./img/avatar3.jpg'} />
            </Map>
        </div>;
    }
}

export default app;
