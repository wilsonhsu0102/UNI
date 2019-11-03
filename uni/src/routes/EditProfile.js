import React from 'react';
import EditPhotoLibrary from './components/EditPhotoLibrary'
import EditHiddenLibrary from './components/EditHiddenLibrary'
import EditProfileInfo from './components/EditProfileInfo'
import EditProfilePicture from './components/EditProfilePicture'
import './components/EditProfile.css'
 
class EditProfile extends React.Component {
    constructor(props) {
        super(props);
    }
 
 
    render() {
        return ([<EditProfilePicture/>, <EditProfileInfo/>, <EditPhotoLibrary/>, <EditHiddenLibrary/>]);
    }
}

export default EditProfile