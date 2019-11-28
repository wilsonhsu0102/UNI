import React from 'react';
import EditPhotoLibrary from '../components/EditPhotoLibrary'
import EditHiddenLibrary from '../components/EditHiddenLibrary'
import EditProfileInfo from '../components/EditProfileInfo'
import EditProfilePicture from '../components/EditProfilePicture'
import '../components/EditProfile.css'
import NavBar from '../components/navbar';
import constants from '../lib/constants'
import Login from '../pages/Login'
import { SessionContext, getSessionCookie, setSessionCookie, removeSessionCookie } from "../session";

class EditProfile extends React.Component {
    state = {
        id: null,
        authenticated: true
    }

    componentDidMount(){
        
        this.getProfile().then((result) => {
            this.setState({
              id: result.id,
              authenticated: true
            })
            
        }).catch((error) => {
            removeSessionCookie()
            console.log(error)  // handle any rejects that come up in the chain.
        })
    }
    
      getProfile(){
          return new Promise((resolve, reject) => {
              fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/getProfile', {
                  method: "GET",
                  credentials: 'include',
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
 
      renderCondition = () => {
        const session = getSessionCookie()
        if (session) {
            return ([<NavBar id={this.state.id}></NavBar>,<EditProfilePicture id={this.state.id}/>, <EditProfileInfo id={this.state.id}/>, <EditPhotoLibrary id={this.id}/>, <EditHiddenLibrary id={this.id}/>]);

        }
        removeSessionCookie()
        return <Login></Login>
      }
 
    render() {
        return this.renderCondition()
    }
}

export default EditProfile