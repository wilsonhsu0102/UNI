import React from 'react';
import Logo from '../images/logo.png';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends React.Component {
    render()  {
        return (
            <div className="Header"> 
            
                <ul className="left"> 
                <li>
                    <SwipeableTemporaryDrawer></SwipeableTemporaryDrawer>
                </li>
                </ul>
                <ul className="right"> 
                <li> 
                    <button className="Header-button"> Profile </button>
                </li>
                <li> 
                    <button className="Header-button"> Other </button>
                </li>
                <li> 
                    <button className="Header-button"> Log in </button>
                </li>
                <li> 
                    <img className="App-logo" src={Logo}/>
                </li>
                </ul>
            </div>
          );
      }
  }
export default NavBar;

