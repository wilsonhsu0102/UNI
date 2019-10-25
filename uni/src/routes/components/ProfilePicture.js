import React from "react";

export default class ProfilePicture extends React.Component {
	constructor(props) {
		super()
		this.id = this.props
		console.log("This is the ProfilePicture for " + this.id);
	}

	render() {
		const name = "Wilson Hsu";
		return (
			<div>
				<img class='profilepic' src={require('./images/profilepic.jpg')} alt='Me'/>
				<h1 class='profilename'> {name} </h1>
			</div>
		);	
	}

}