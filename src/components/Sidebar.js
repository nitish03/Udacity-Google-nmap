import React, { Component } from 'react';
import Placelist from './Placelist';

class Sidebar extends Component {
	render() {
		return (
			<div className="sidebar">
			<input type={"search"} id={"find"} placeholder={"Find Your Place"} />
			<Placelist />
			</div>
		);
	}
}

export default Sidebar;
