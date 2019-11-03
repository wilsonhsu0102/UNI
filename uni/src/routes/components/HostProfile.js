import React from 'react';

class HostProfile extends React.Component {
    constructor(props) {
        super(props) 
        this.host = this.props.id;
        /// Get host info from server
        if (this.host === 1) {
            this.hostProfile = require("./images/coverPhoto1.jpg");
        } else {
            this.hostProfile = require("./images/profilepic.jpg")
        }
    }
    goToProfile(profileId) {
        window.location.href='http://localhost:3000/profile/' + profileId;
    }

    render() {
        return (
                <button className="profileButton" onClick={this.goToProfile.bind(this, this.host)}> <img src={this.hostProfile} alt="profile for host"/> </button>
        );
    }
}
export default HostProfile;