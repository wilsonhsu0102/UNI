import React from 'react';
import EditPhotoLibary from './components/EditPhotoLibrary'
import EditProfileInfo from './components/EditProfileInfo'
import './components/EditProfile.css'
 
class EditProfile extends React.Component {
    constructor(props) {
        super(props);
    }
 
 
    render() {
        return ([<EditPhotoLibary/>, <EditProfileInfo/>]);
    }
}

export default EditProfile