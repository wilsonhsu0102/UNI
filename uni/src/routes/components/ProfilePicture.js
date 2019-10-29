import React from "react";
import './ProfilePage.css'

export default class ProfilePicture extends React.Component {
	constructor(props) {
		super()
		this.id = this.props
		// will retrieve name and profile image data from database
		this.name = 'Wilson Hsu'
		this.ProfilePicture = require('./images/profilepic.jpg')
		console.log("This is the ProfilePicture for " + this.id);
	}

	render() {
		return (
			<div>
				<img class='profilepic' src={this.ProfilePicture} alt='Me'/>
				<h1 class='profilename'> {this.name} </h1>
			</div>
		);	
	}

}