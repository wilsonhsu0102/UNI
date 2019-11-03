import React from 'react';
import { Link } from 'react-router-dom';
import SelfIntro from './components/SelfIntro'
import Bio from './components/Bio'
import ProfilePicture from './components/ProfilePicture'
import HiddenInfo from './components/HiddenInfo'
import PhotoLibrary from './components/PhotoLibrary'
import ProfileEdit from './components/ProfileEdit'
import './components/ProfilePage.css'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        console.log("This is the profile page for profile id" + this.id);
    }

    render() {
      return ([<ProfilePicture/>, <SelfIntro/>, <Bio/>, <HiddenInfo/>, <PhotoLibrary/>, <ProfileEdit/>]);
    }
  }
export default Profile;