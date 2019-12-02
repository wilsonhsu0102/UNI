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
import axios from 'axios'; 

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {}
        }
        console.log(this.props.id)
    }

    componentDidMount(){
        console.log("Loading profile page.")
        axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/student/getAccount/${this.props.id}`, {withCredentials: true})
		.then(res => {
			
            this.setState({
                account: res.data
            })
            console.log(res)
			console.log(this.state.account)
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
		
		})
    }


    // renderCondition() {
    //     console.log("rendercondition profile page", parseInt(this.state.account._id))
    //     const session = getSessionCookie()
    //     if (session !== undefined) {
    //         return [<NavBar id ={this.state.account._id}></NavBar>,
    //         <ProfilePicture id={this.state.account._id} key={0}/>, 
    //         <SelfIntro id={this.state.account._id} key={1}/>,
    //         <Bio id={this.state.account._id} key={2}/>, 
    //         <HiddenInfo id={this.state.account._id} key={3}/>, 
    //         <PhotoLibrary id={this.state.account._id} key={4}/>]
    //     } else {
    //         return <Login></Login>
    //     }
    // }

    render() {
        return [<NavBar id ={this.props.id}></NavBar>,
            <ProfilePicture id={this.props.id} key={0}/>, 
            <SelfIntro id={this.props.id} key={1}/>, 
            <Bio id={this.props.id} key={2}/>, 
            <HiddenInfo id={this.props.id} key={3}/>, 
            <PhotoLibrary id={this.props.id} key={4}/>]
    } 
  }
export default Profile;