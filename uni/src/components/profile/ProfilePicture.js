import React from "react";
import './ProfilePage.css';
import constants from '../../lib/constants';
import axios from 'axios'; 

export default class ProfilePicture extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			account: this.props.account,
		}
	}

	render() {
		console.log(this.state.account.profilePicture)
		return (
			<div>
				<img className='profilepic' src={`data:image/png;base64,${this.state.account.profilePicture}`} alt='Me'/>

				<h1 className='profilename'> {this.state.account.name} </h1>
			</div>
		);	
	}

}