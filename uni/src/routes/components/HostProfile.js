import React from 'react';

class HostProfile extends React.Component {

    render() {
        return (
                <button className="profileButton"> <img src={require("./images/coverPhoto1.jpg")} alt="profile for host"/> </button>
        );
    }
}
export default HostProfile;