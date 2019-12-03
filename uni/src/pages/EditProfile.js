import React from 'react';
import EditPhotoLibrary from '../components/editprofile/EditPhotoLibrary'
import EditHiddenLibrary from '../components/editprofile/EditHiddenLibrary'
import EditProfileInfo from '../components/editprofile/EditProfileInfo'
import EditProfilePicture from '../components/editprofile/EditProfilePicture'
import '../components/editprofile/EditProfile.css'
import NavBar from '../components/navbar';
import constants from '../lib/constants'
import Login from '../pages/Login'
import { SessionContext, getSessionCookie, setSessionCookie, removeSessionCookie } from "../session";

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log("edit profile page")
    }
    
 
      renderCondition = () => {
        const session = getSessionCookie()
        if (session) {
            return ([<NavBar id={this.props.id}></NavBar>,<EditProfilePicture id={this.props.id}/>, <EditProfileInfo id={this.props.id}/>, <EditPhotoLibrary id={this.props.id}/>, <EditHiddenLibrary id={this.props.id}/>]);

        }
        removeSessionCookie()
        return <Login></Login>
      }
 
    render() {
        return this.renderCondition()
    }
}

export default EditProfile