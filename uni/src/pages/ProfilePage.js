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
import { SessionContext, getSessionCookie, setSessionCookie, removeSessionCookie } from "../session";
import constants from '../lib/constants'
import axios from 'axios'; 
import PacmanLoader from 'react-spinners/PacmanLoader';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {},
            loading: true
        }
        console.log(this.props.id)
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                loading: false
            })
        }, 5000)
    }

    loading = () => {
        const session = getSessionCookie()
        if (session) {
            this.host = session;
            console.log(session)
            return [<NavBar id = {this.props.id} key={"NavBar"}></NavBar>, <div className='sweet-loading'>
                <PacmanLoader
                color={'rgb(245, 150, 164)'}
                loading={this.state.loading}
                />
            </div>]
        }
        removeSessionCookie()
        return <Login></Login>
    }


    renderCondition() {
        console.log("rendercondition profile page", parseInt(this.state.account._id))
        const session = getSessionCookie()
        if (session) {
            return [<NavBar id ={this.props.id}></NavBar>,
            <ProfilePicture id={this.props.id} key={0}/>, 
            <SelfIntro id={this.props.id} key={1}/>,
            <Bio id={this.props.id} key={2}/>, 
            <HiddenInfo id={this.props.id} key={3}/>, 
            <PhotoLibrary id={this.props.id} key={4}/>]
        } 
        removeSessionCookie()
        return <Login></Login>
    }

    render() {
        return (this.state.loading ? this.loading() : this.renderCondition())
    } 
  }
export default Profile;