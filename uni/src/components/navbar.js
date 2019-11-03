import React from 'react';
import Logo from '../images/logo.png';
import SwipeableTemporaryDrawer from './SwipeableTemporaryDrawer'
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    render()  {
        return (
            <div className="Header"> 
            
                <ul className="left"> 
                <li>
                    <SwipeableTemporaryDrawer id={this.props.id}></SwipeableTemporaryDrawer>
                </li>
                </ul>
                <ul className="right"> 
                <li>
                <input type="text" className="input" onChange={this.handleChange} placeholder="Search..." />
                </li>
                <li> 
                    <Link to={{pathname:"/profile/"+this.props.id, state: { id:this.props.id }}}>

                        <button className="Header-button"> Profile </button>
                    </Link>
                </li>
                <li> 
                    <Link to={{pathname:'/eventList', state: { id:this.props.id }}}>
                        <button className="Header-button"> Events </button>
                    </Link>
                </li>
                <li> 
                    <Link to={{pathname:'/', state: { id:this.props.id }}}>
                        <button className="Header-button"> Log Out </button>
                    </Link>
                </li>
                <li> 
                    <Link to={{pathname:'/home', state: { id:this.props.id }}}>
                        <img className="App-logo" src={Logo} alt="app logo"/>
                    </Link>
                </li>
                </ul>
            </div>
          );
      }
  }
export default NavBar;

