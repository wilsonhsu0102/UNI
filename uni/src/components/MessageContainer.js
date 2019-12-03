
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChatMessage from './ChatMessage'
import './MessageContainer.css'

/* Component for the Message Container */
class MessageContainer extends React.Component {
	state = {
		time: 0,
		messages: []
	}
	
	
	componentDidMount(){
		
		//Periodically checks if there are new messages to be added	
		this.interval = setInterval(() => {
			this.setState({
				time: this.state.time + 1,
				messages: this.props.params.messages
			})
		}, 1000);
			
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
    render() {
		const { userId, userName, connectionData} = this.props.params
		const {sendHandler, messageHandler} = this.props
		console.log(this.props.params.messages);
		//console.log(connectionData);
		if(!connectionData){
			return (<div id="messageDiv">Loading Page. Please Wait.</div>);
		}
        return (
            <div id="messageDiv">
				<h4 id="connectName">
					<img id="connectAvatar" src={require('../../public' + connectionData.profilePicture)}/>
					{connectionData.name} 
					<p id="connectEmail"> {connectionData.email}</p>
				</h4>
				<div id="chatContainer">
					{ this.state.messages.map((message) => {
							if(message.userID === connectionData._id.toString()){
								return(
									ChatMessage(connectionData.name, message.message, true)
								)
							}
							else{
								return(
									ChatMessage(userName, message.message, false)
								)
							}
						}) 
					}
				</div>
				<form id="messageForm">
					<input id="userMessageInput" type="text" placeholder="Type a message" onChange={messageHandler}></input>
					<Button id="sendButton" variant="outlined" onClick={sendHandler}>SEND</Button>
				</form>
            </div>
        );
    }
}

export default MessageContainer;