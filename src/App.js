import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import SquareAPI from './API/Api';

class App extends Component {

  constructor(props) {
    super(props);
      this.state = {
        venues: [],
        markers: [],
        center: [],
        zoom: 11
      }
  }

  componentDidMount() {
    SquareAPI.search({
      near: "Jacksonville,FL",
      query: "pizza",
      limit: 15
    }).then(results => {
      const { venues } = results.response;
      const { center } = results.response.geocode.feature.geometry;
      const markers = venues.map(venue => {
        return {
          lat: venue.location.lat,
          lng: venue.location.lng,
          id: venue.id,
          isOpen: false,
          isVisible: true
        };
      });
      this.setState({venues, markers, center});
      console.log(results)
    });
  }

  markedInfoWindow = (info) => {
    this.cancelInfo();
    info.isOpen = true;
    this.setState({markers: Object.assign(this.state.markers, info)})
    const place = this.state.venues.find(place => place.id === info.id);
    SquareAPI.venueDetails(info.id)
    .then(res => {
      const newPlace = Object.assign(place, res.response.venue)
      this.setState({venues: Object.assign(this.state.venues, newPlace)})
     console.log(newPlace)})
  }

  cancelInfo = () => {
    const markers = this.state.markers.map(marker => {
      marker.isOpen = false;
      return marker;
    });
    this.setState({markers: Object.assign(this.state.markers, markers)})
  }

  render() {
    return (
      <div className="App">
        <Map {...this.state} markedInfoWindow = {this.markedInfoWindow}/>
      </div>
    );
  }
}

export default App;
