import React from 'react';

class HostProfile extends React.Component {

    goToProfile(profileId) {
        window.location.href='http://localhost:3000/profile/' + profileId;
    }

    render() {
        return (
                <button className="profileButton" onClick={this.goToProfile.bind(this, 1)}> <img src={require("../images/coverPhoto1.jpg")} alt="profile for host"/> </button>
        );
    }
}
export default HostProfile;