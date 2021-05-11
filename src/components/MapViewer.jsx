import React, { Component } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { latLngBounds } from 'leaflet';

class MapViewer extends Component {
    constructor(props){
        super (props);

        this.state = {
            corner1 : [6.092365, -75.695086],
            corner2 : [6.466048, -75.359317],
            height : 400
        };
    }

    updateDimension(){
        const height = window.innerWidth >= 992 ? window.innerHeight -64 : 400;
        return height;
    }

    getBounds() {
        console.log("Bounds?");
        return latLngBounds(this.state.corner1, this.state.corner2);
    }

    render(){
        return(
            <div>
                <MapContainer maxBounds={this.getBounds()} center={[6.2519059, -75.5680812]} 
                    style={{height : this.updateDimension()}} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
            </div>
        );
    }
}

export default MapViewer