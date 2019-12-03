import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
// import MailIcon from '@material-ui/icons/Mail';
import ChatIcon from '@material-ui/icons/Chat';
import TodayIcon from '@material-ui/icons/Today';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
// import {  Nav } from 'react-bootstrap';
import { SessionContext, getSessionCookie, setSessionCookie, removeSessionCookie } from "../session";
import { Link } from 'react-router-dom';




export default function SwipeableTemporaryDrawer(userid) {
  console.log("SwipeableTemporaryDrawer", userid)
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open});
  };

  const getExtraButton = () => {
    console.log("extra button")
    return <Link to={{pathname:"/admin"}}>
            <ListItem button>
            <ListItemIcon>
            <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Admin" />
            </ListItem>
           </Link>
  }

  const sideList = side => (
    
    <div
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
      style={{width: "350px"}}
    >
      <List>
      <Link to={{pathname:getSessionCookie() && getSessionCookie().admin ? "/admin" : "/home", state: { id: userid.id }}}>
      <ListItem button>
        <ListItemIcon>
          <ChatIcon />
        </ListItemIcon>
        <ListItemText primary= "Home" />
        </ListItem>
        </Link>
        <Link to={{pathname:"/connections", state: { id: userid.id }}}>
        <ListItem button>
        <ListItemIcon>
        <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Connections" />
        </ListItem>
        </Link>
        <Link to={{pathname:"/eventList", state: { id: userid.id }}}>
        <ListItem button>
        <ListItemIcon>
        <TodayIcon />
        </ListItemIcon>
        <ListItemText primary="Events" />
        </ListItem>
        </Link>
        <Link to={{pathname:"/edit/profile"}}>
        <ListItem button>
        <ListItemIcon>
        <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
        </ListItem>
        </Link>
        {getSessionCookie() && getSessionCookie().admin ? getExtraButton() : null}
      </List>
      
    </div>
  );

  
  return (
    <div>
      <Button className='menu' onClick={toggleDrawer('left', true)}>☰</Button>
      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {sideList('left')}
      </SwipeableDrawer>
    </div>
  );
}