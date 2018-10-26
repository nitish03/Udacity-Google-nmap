import React, { Component } from 'react';
import Placelist from './Placelist';

class Sidebar extends Component {

	constructor(props) {
		super(props);
		this.state = {
			query: ''
		}
	}

	searchBar = event => {
		this.setState({query: event.target.value})
	}

	render() {
		return (
			<div className="sidebar">
			<input type={"search"} id={"find"} placeholder={"Find Your Place"} />
			<Placelist {...this.props} handlePlaceList= {this.props.handlePlaceList}/>
			</div>
		);
	}
}

export default Sidebar;
