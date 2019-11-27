import React from 'react';
import SelfIntro from '../components/profile/SelfIntro'
import Bio from '../components/profile/Bio'
import Login from '../pages/Login'
import ProfilePicture from '../components/profile/ProfilePicture'
import HiddenInfo from '../components/profile/HiddenInfo'
import PhotoLibrary from '../components/profile/PhotoLibrary'
import ProfileEdit from '../components/profile/ProfileEdit'
import '../components/profile/ProfilePage.css'
import NavBar from '../components/navbar';
import PermissionDenied from '../pages/PermissionDenied'
import { SessionContext, getSessionCookie, setSessionCookie } from "../session";
import constants from '../lib/constants'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: {}
        }
        console.log("This is the profile page for profile id" + this.state.profile.id);
    }

    componentDidMount(){
        console.log("Profile page")
        this.getProfile().then((result) => {
            this.setState({
              profile: result,
            })
            console.log("setting state")
            console.log(this.state.profile)
        }).catch((error) => {
            console.log(error)  // handle any rejects that come up in the chain.
            console.log("failed setting state")
        })
    }
    
      getProfile(){
          return new Promise((resolve, reject) => {
              fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/getProfile', {
                  method: "GET",
                  credentials: 'include',
                    headers: {
                    "Access-Control-Allow-Credentials": "true",
                    "Content-type": "application/json; charset=UTF-8"
                    }})
                  .then(res => res.json())
                  .then(
                      
                  (result) => {
                      console.log("inside function")
                      console.log(result)
                      resolve(result)
                  },
                  (error) => {
                      reject('issue with getting resource')
                  }
              )
          })
          
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
        return [<NavBar id ={this.state.profile.id}></NavBar>,
            <ProfilePicture id={this.state.profile.id} key={0}/>, 
            <SelfIntro id={this.state.profile.id} key={1}/>, 
            <Bio id={this.state.profile.id} key={2}/>, 
            <HiddenInfo id={this.state.profile.id} key={3}/>, 
            <PhotoLibrary id={this.state.profile.id} key={4}/>, 
            <ProfileEdit id={this.state.profile.id} key={5}/>]
    } 
  }
export default Profile;