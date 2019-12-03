import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

export default function AlignItemsList(key, student, selfId, selfName) {
	
    return (
      <List>
        <ListItem alignItems="flex-start" style={{paddingLeft: "30px"}}>
          <ListItemAvatar>
            <Avatar alt={student.name} src={`data:image/png;base64,${student.profilePicture}`} />
          </ListItemAvatar>
          <ListItemText
            primary=" — New connection... Say hi!"
            secondary={
              <React.Fragment>
                <Typography
                  component="span"
                  variant="body2"
                  color="textPrimary"
                >
                  {student.name}
                </Typography>
                <span style={{color: "#f3acc"}}> {student.email}</span>
                
              </React.Fragment>
            }
          />
		  <Link to={{pathname:"/chat/"+student.email, params: { selfId: selfId, selfName: selfName,connectId: student._id, student: student}}}>
		    <Button variant="outlined"> CHAT</Button>
          </Link>
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    );
  }