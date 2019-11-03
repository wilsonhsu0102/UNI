import React from "react";
import './ProfilePage.css'

export default class ProfilePicture extends React.Component {
	constructor(props) {
		super(props);
		this.profileId = Number(this.props.id);
		// will retrieve name and profile image data from database
		if (this.profileId !== 1) {
			this.name = 'Wilson Hsu'
			this.ProfilePicture = require('./images/profilepic.jpg')
		} else {
			this.name = 'Authur Fleck'
			this.ProfilePicture = require('./images/coverPhoto1.jpg')
		}
	}

	render() {
		return (
			<div>
				<img className='profilepic' src={this.ProfilePicture} alt='Me'/>
				<h1 className='profilename'> {this.name} </h1>
			</div>
		);	
	}

}