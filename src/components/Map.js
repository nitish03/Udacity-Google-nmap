/*global google*/
import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps";

/*show alert if users Google API failed*/
window.gm_authFailure = () => {
	alert("Something went wrong. Please check your Google API key and try again.")
}

const style = [
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#444444"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#0e3545"
            },
            {
                "visibility": "on"
            }
        ]
    }
]

/*set the map, markers and info windows and also add parseFloat to fix location error*/
const MyMap = withScriptjs(withGoogleMap((props) =>
	<GoogleMap
		defaultZoom={8} zoom = {props.zoom}
		defaultCenter={{ lat: 30.66775, lng: -81.461511 }}
		center = {{lat: parseFloat(props.center.lat), lng: parseFloat(props.center.lng)}}
		defaultOptions = {{
			styles: style
		}}
	>
		{props.markers &&
			props.markers.filter(marker => marker.isVisible)
			.map((marker, id, arr) => {
				const placeInfo = props.venues.find(place => place.id === marker.id);
		 return (
			 <Marker key={id}
			 position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng)}}
			 /*show info on click of the marker*/
			 onClick ={() => props.markedInfoWindow(marker)}
			 /*set animation of markers*/
			 animation= {arr.length === 1 ? google.maps.Animation.BOUNCE : google.maps.Animation.DROP}
			 icon = {marker.icon}>
			 {/*fetch FourSquare API and get the photos of places, name and their locaton information*/}
		 {marker.isOpen && placeInfo.bestPhoto &&(
			 <InfoWindow onCloseClick ={() => props.cancelInfo()}>
			 <React.Fragment>
			 <img src= {`${placeInfo.bestPhoto.prefix}120x150${placeInfo.bestPhoto.suffix}`} alt={`Place: ${placeInfo.name}`}/>
		    <h3>{placeInfo.name}</h3>
				<p>{placeInfo.location['address']}</p>
				</React.Fragment>
			 </InfoWindow>
		 )}
		 </Marker>
	 );
	 })}
</GoogleMap>
));

class Map extends Component {
	render() {
		return(
			<MyMap
			 {...this.props}
			  googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=Your-Google-API-Key-Here"
			  loadingElement={<div style={{ height: `100%` }} />}
			  containerElement={<div style={{ width: `70vw`, height: `100vh` }} />}
			  mapElement={<div style={{ height: `100%` }} />}
			/>
		);
	}
}

export default Map;
