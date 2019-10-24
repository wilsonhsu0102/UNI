import React from 'react';
import { Link } from 'react-router-dom';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        console.log("This is the profile page for profile id" + this.id);
    }
    render()  {
        return (
             <h1>This is the Profile page for profile id {this.id} </h1>
          );
      }
  }
export default Profile;