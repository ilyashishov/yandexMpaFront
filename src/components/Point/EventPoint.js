import React from 'react';
import {Marker, MarkerLayout} from 'yandex-map-react';

class EventPoint extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            popupOpen: false
        }
    }

    handleClick(){
        this.props.openEventInfo();
        // this.setState({popupOpen: !this.state.popupOpen})
    }

    render() {
        return <Marker lat={this.props.lat} lon={this.props.lon} onClick={this.handleClick.bind(this)}>
            <MarkerLayout>
                <div style={{position: 'relative', zIndex: 10, height: 45}}>
                    <div style={{width: 5, height: 5, background: '#AA00FF', position: 'absolute', bottom: -5, left: 27.5}}></div>
                    <div style={{borderRadius: '10px', overflow: 'hidden', width: 60, height: 40, background: 'url('+this.props.avatar+')', backgroundPosition: 'center', backgroundSize: 'cover'}}>
                        <img src="" alt=""/>
                    </div>
                </div>
            </MarkerLayout>
        </Marker>
    }
}

EventPoint.contextTypes = {
    openEventInfo: React.PropTypes.func,
};

export default EventPoint;