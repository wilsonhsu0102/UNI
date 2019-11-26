import React from 'react';
import EditPhotoLibrary from '../components/EditPhotoLibrary'
import EditHiddenLibrary from '../components/EditHiddenLibrary'
import EditProfileInfo from '../components/EditProfileInfo'
import EditProfilePicture from '../components/EditProfilePicture'
import '../components/EditProfile.css'
import NavBar from '../components/navbar';
import constants from '../lib/constants'


class EditProfile extends React.Component {
    state = {
        id: null
    }

    componentDidMount(){
        this.getProfile().then((result) => {
            this.setState({
              id: result.id
            })
            
        }).catch((error) => {
            console.log(error)  // handle any rejects that come up in the chain.
        })
    }
    
      getProfile(){
          return new Promise((resolve, reject) => {
              fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/getProfile', {
                  method: "GET",
                  headers: {
                  "access-control-allow-origin" : "*",
                  "Content-type": "application/json; charset=UTF-8"
                  }})
                  .then(res => res.json())
                  .then(
                      
                  (result) => {
                      resolve({
                          id: result
                      })
                  },
                  (error) => {
                      reject('issue with getting resource')
                  }
              )
          })
          
      }
 
 
    render() {
        return ([<NavBar id={this.id}></NavBar>,<EditProfilePicture id={this.id}/>, <EditProfileInfo id={this.id}/>, <EditPhotoLibrary id={this.id}/>, <EditHiddenLibrary id={this.id}/>]);
    }
}

export default EditProfile