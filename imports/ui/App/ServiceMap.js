import React, { Component } from 'react';
import {withGoogleMap,
     GoogleApiWrapper,
     Polygon,
     Map } from 'google-maps-react';

import key from './shhkey.js';
 
export class ServiceMap extends Component {

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };
 
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {
 const polygon = [
    { lat: 4.684192, lng: -74.048591 },
    { lat: 4.679669, lng: -74.038973 },
    { lat: 4.669161, lng: -74.045765 },
    { lat: 4.674838, lng: -74.058620 }

];
 
  return(
    <Map
      google={this.props.google}
      className="map"
      initialCenter={{
            lat: 4.679226,
            lng: -74.046426,
          }}
      style={{ height: '100%', position: 'relative', width: '100%' }}
      zoom={14}>
      <Polygon
        fillColor="#0000FF"
        fillOpacity={0.35}
        paths={[polygon]}
        strokeColor="#0000FF"
        strokeOpacity={0.8}
        strokeWeight={2}
      />
    </Map>
);
}
 }
export default GoogleApiWrapper({
  apiKey: (key.key)
})(ServiceMap);