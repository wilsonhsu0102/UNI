import React from 'react';

class HostProfile extends React.Component {
    constructor(props) {
        super(props) 
        this.host = this.props.id;
        /// Get host info from server
        if (this.host === 1) {
            this.name = "Joker"
            this.hostProfile = require("../images/coverPhoto1.jpg");
            this.location = "NC3111"
            this.datetime = 'Thu Nov 07 2019 11:15:00 GMT-0500 (Eastern Standard Time)'
        } else {
            this.name = "Wilson Hsu"
            this.hostProfile = require("../images/profilepic.jpg")
            this.location = "Robarts Library"
            this.datetime = 'Thu Nov 07 2019 11:15:00 GMT-0500 (Eastern Standard Time)'
        }
    }
    goToProfile(profileId) {
        window.location.href='http://localhost:3000/profile/' + profileId;
    }

    render() {
        return (
            <div className="hostProfile">
                <button className="profileButton" onClick={this.goToProfile.bind(this, this.host)}> <img src={this.hostProfile} alt="profile for host"/> </button>
                <h3 className="hostName"> Host: {this.name} </h3>
                <div className='eventDetail'>
                    <p> Location: {this.location} </p>
                    <p> Date: {this.datetime} </p>
                </div>
            </div>
       );
    }
}
export default HostProfile;