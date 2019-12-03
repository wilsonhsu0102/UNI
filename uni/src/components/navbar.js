import React from 'react';
import Logo from '../images/logo.png';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import { Link } from 'react-router-dom';
import { getSessionCookie } from '../session';
import constants from '../lib/constants'
import axios from 'axios'; 

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: {}
        }
        
    }

    componentDidMount(){
        console.log("Loading profile page.")
        axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/student/getAccount`, {withCredentials: true})
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

    goToProfile(profileId) {
        window.location.href = constants.HTTP + constants.HOST + '/profile/' + profileId;
    }

    render()  {
        const session = getSessionCookie()
        return (
            <div className="Header"> 
            
                <ul className="left"> 
                <li>
                    <SwipeableTemporaryDrawer></SwipeableTemporaryDrawer>
                </li>
                </ul>
                <ul className="right"> 
                <li> 
                    <button className="Header-button" onClick={this.goToProfile.bind(this, this.state.account._id)}> Profile </button>
                </li>
                <li> 
                    <Link to={{pathname:'/eventList', state: { id:this.props.id }}}>
                        <button className="Header-button"> Events </button>
                    </Link>
                </li>
                <li> 
                    <Link to={{pathname:'/login', state: { id:this.props.id }}}>
                        <button className="Header-button"> Log Out </button>
                    </Link>
                </li>
                <li> 
                    <Link to={{pathname: session && session.admin ? '/admin' : '/home', state: { id:this.props.id }}}>
                        <img className="App-logo" src={Logo} alt="app logo"/>
                    </Link>
                </li>
                </ul>
            </div>
          );
      }
  }
export default NavBar;

