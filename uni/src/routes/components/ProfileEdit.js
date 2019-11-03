import React from "react";
import { withRouter } from 'react-router-dom';
import './ProfilePage.css'

class ProfileEdit extends React.Component {
	constructor(props) {
		super()
        this.id = this.props
        this.routeChange = this.routeChange.bind(this)
        console.log("This is the profile edit button for " + this.id);
        this.name = "user";
    }
    
    // add event listener to route to new profile editing page
    routeChange() {
        let path = this.name + "/edit";
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