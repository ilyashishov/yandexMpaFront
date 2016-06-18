import React from 'react';
import {Marker, MarkerLayout} from 'yandex-map-react';

class Point extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            popupOpen: false
        }
    }

    handleClick(){
        this.props.openInfo();
        // this.setState({popupOpen: !this.state.popupOpen})
    }

    render() {
        return <Marker lat={this.props.lat} lon={this.props.lon} onClick={this.handleClick.bind(this)}>
            <MarkerLayout>
                <div style={{position: 'relative', zIndex: 10, height: 95,}}>
                    <div style={{width: 5,height: 5,position: 'absolute', bottom: -5, left: 37.5, background: '#D50000'}}></div>
                    <div style={{borderRadius: '50%', overflow: 'hidden', width: 80, height: 80}}>
                        <img style={{width: 90, height: 90}} src={this.props.avatar}/>
                    </div>
                    {
                        this.state.popupOpen &&
                        <div className="map_popup animated bounceIn">
                            <h4>James Skarzinskas</h4>
                            <a href="">Send a message</a>
                        </div>
                    }
                </div>
            </MarkerLayout>
        </Marker>
    }
}

Point.contextTypes = {
    openInfo: React.PropTypes.func,
};

export default Point;