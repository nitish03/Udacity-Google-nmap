import React, { Component } from 'react';

class Listconatiner extends Component {
	render() {
		return (
			<div>
			<li className="list"
			onClick= {() => this.props.handlePlaceList(this.props)}
			tabIndex = "0" role = "list"
			>
			{this.props.name}
			</li>
			</div>
		);
	}
}

export default Listconatiner;
