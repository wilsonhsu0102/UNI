import React from 'react';
import Logo from '../images/logo.png';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import {  Nav } from 'react-bootstrap';

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
                <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
                </li>
                <li> 
                    {/* default user set to wilson for now*/}
                    <Nav.Link href={"/profile/0"}>
                        <button className="Header-button"> Profile </button>
                    </Nav.Link>
                </li>
                <li> 
                    <Nav.Link href="/eventList">
                        <button className="Header-button"> Events </button>
                    </Nav.Link>
                </li>
                <li> 
                    <button className="Header-button"> Log in </button>
                </li>
                <li> 
                    <Nav.Link href="/home">
                        <img className="App-logo" src={Logo}/>
                    </Nav.Link>
                </li>
                </ul>
            </div>
          );
      }
  }
export default NavBar;

