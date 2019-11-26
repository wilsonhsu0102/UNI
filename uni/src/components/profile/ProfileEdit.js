import React from "react";
import { withRouter } from 'react-router-dom';
import './ProfilePage.css'

class ProfileEdit extends React.Component {
	constructor(props) {
		super(props)
        this.id = Number(this.props.id)
        this.routeChange = this.routeChange.bind(this)
        console.log("This is the profile edit button for " + this.id);
    }
    
    // add event listener to route to new profile editing page
    routeChange() {
        let path = this.id + "/edit";
        this.props.history.push(path);
    }


	render() {
		return (
			<div>
				<button id='editprofilebutton' onClick={this.routeChange}>Edit Profile</button>
			</div>
		);	
	}

}

export default withRouter(ProfileEdit);