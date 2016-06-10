import React from 'react';
import {Marker, MarkerLayout} from 'yandex-map-react';

export default class Point extends React.Component {
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
                    <div style={{borderRadius: '50%', overflow: 'hidden', width: 80, height: 80}}>
                        <img style={{width: 90, height: 90}} src={this.props.avatar}/>
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
