import React from 'react';
import SelfIntro from '../components/SelfIntro'
import Bio from '../components/Bio'
import Login from '../pages/Login'
import ProfilePicture from '../components/ProfilePicture'
import HiddenInfo from '../components/HiddenInfo'
import PhotoLibrary from '../components/PhotoLibrary'
import ProfileEdit from '../components/ProfileEdit'
import '../components/ProfilePage.css'
import NavBar from '../components/navbar';
import PermissionDenied from '../pages/PermissionDenied'
import { SessionContext, getSessionCookie, setSessionCookie } from "../session";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.profileId = this.props.id;
        console.log("This is the profile page for profile id" + this.profileId);
    }
/*
    renderCondition() {
        console.log("rendercondition profile page", parseInt(this.props.id))
        const session = getSessionCookie()
        if (session !== undefined) {
            return [<NavBar id ={this.props.id}></NavBar>,<ProfilePicture id={this.profileId} key={0}/>, <SelfIntro id={this.profileId} key={1}/>, <Bio id={this.profileId} key={2}/>, <HiddenInfo id={this.profileId} key={3}/>, <PhotoLibrary id={this.profileId} key={4}/>, <ProfileEdit id={this.profileId} key={5}/>]
        } else {
            return <Login></Login>
        }
    }
*/
    render() {
        return [<NavBar id ={this.props.id}></NavBar>,<ProfilePicture id={this.profileId} key={0}/>, <SelfIntro id={this.profileId} key={1}/>, <Bio id={this.profileId} key={2}/>, <HiddenInfo id={this.profileId} key={3}/>, <PhotoLibrary id={this.profileId} key={4}/>, <ProfileEdit id={this.profileId} key={5}/>]
    } 
  }
export default Profile;