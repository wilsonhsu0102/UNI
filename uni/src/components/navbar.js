import React from 'react';
import Logo from '../images/logo.png';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import MenuIcon from '@material-ui/icons/Menu';

class NavBar extends React.Component {
    render()  {
        return (
            <div class="Header"> 
            
                <ul class="left"> 
                <li>
                    <SwipeableTemporaryDrawer></SwipeableTemporaryDrawer>
                </li>
                </ul>
                <ul class="right"> 
                <li> 
                    <button class="Header-button"> Log in </button>
                </li>
                <li> 
                    <button class="Header-button"> Profile </button>
                </li>
                <li> 
                    <button class="Header-button"> Other </button>
                </li>
                <li> 
                    <img class="App-logo" src={Logo}/>
                </li>
                </ul>
            </div>
          );
      }
  }
export default NavBar;

