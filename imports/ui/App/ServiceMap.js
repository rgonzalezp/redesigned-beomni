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
    { lat: 37.789411, lng: -122.422116 },
    { lat: 37.785757, lng: -122.421333 },
    { lat: 37.789352, lng: -122.415346 }
];
 
  return(
    <Map
      google={this.props.google}
      className="map"
      style={{ height: '50%', position: 'relative', width: '50%' }}
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