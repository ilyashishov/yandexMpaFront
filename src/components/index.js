import React from 'react';
import {Link} from 'react-router'
import { Map, Marker, MarkerLayout } from 'yandex-map-react';

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
                <Marker lat={55.783379} lon={37.775575} onClick={this.handleClick.bind(this)}>
                    <MarkerLayout>
                        <div style={{textAlign: 'center', position: 'relative'}}>
                            <div style={{borderRadius: '50%', overflow: 'hidden', width: 80, display: 'inline-block'}}>
                                <img style={{width: 80, height: 80}} src="./img/avatar.jpg"/>
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
                <Marker lat={55.583000} lon={37.575750} onClick={this.handleClick.bind(this)}>
                    <MarkerLayout>
                        <div style={{textAlign: 'center', position: 'relative'}}>
                            <div style={{borderRadius: '50%', overflow: 'hidden', width: 80, display: 'inline-block'}}>
                                <img style={{width: 80, height: 80}} src="./img/avatar2.jpg"/>
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
            </Map>
        </div>;
    }
}

export default app;
