import React from 'react';
import EditPhotoLibrary from '../components/EditPhotoLibrary'
import EditHiddenLibrary from '../components/EditHiddenLibrary'
import EditProfileInfo from '../components/EditProfileInfo'
import EditProfilePicture from '../components/EditProfilePicture'
import '../components/EditProfile.css'
import NavBar from '../components/navbar';

class EditProfile extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
    }
 
 
    render() {
        return ([<NavBar></NavBar>,<EditProfilePicture id={this.id}/>, <EditProfileInfo id={this.id}/>, <EditPhotoLibrary id={this.id}/>, <EditHiddenLibrary id={this.id}/>]);
    }
}

export default EditProfile