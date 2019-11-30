
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import './MessageContainer.css'

/* Component for the Message Container */
class MessageContainer extends React.Component {
    render() {
		const { userId, userName, connectionData, messages} = this.props.params
		console.log(this.props.params);
		//console.log(connectionData);
		if(!connectionData){
			return (<div id="messageDiv">Loading Page. Please Wait.</div>);
		}
        return (
            <div id="messageDiv">
				<h4 id="connectName">
					<img id="connectAvatar" src={require("../images/" + connectionData.profilePicture)}/>
					{connectionData.name} 
					<p id="connectEmail"> {connectionData.email}</p>
				</h4>
				<div id="chatContainer">
				</div>
				<form id="messageForm">
					<input id="userMessageInput" type="text" placeholder="Type a message"></input>
					<Button id="sendButton" variant="outlined">SEND</Button>
				</form>
            </div>
        );
    }
}

export default MessageContainer;