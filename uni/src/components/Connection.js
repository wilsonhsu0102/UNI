import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


export default function AlignItemsList(key, student) {
    
    return (
      <List>
        <ListItem alignItems="flex-start" style={{paddingLeft: "30px"}}>
          <ListItemAvatar>
            <Avatar alt={student.name} src={require("../images/" + student.profilePicture)} />
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
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    );
  }