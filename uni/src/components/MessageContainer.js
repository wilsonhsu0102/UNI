
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChatMessage from './ChatMessage'
import './MessageContainer.css'

/* Component for the Message Container */
class MessageContainer extends React.Component {
	scrollHandler = event => {
        let box = document.querySelector("#chatContainer");
		box.scrollTop = box.scrollHeight;
    }
	
	mightScroll(){
		let box = document.querySelector("#chatContainer");
		if ((box.scrollHeight - box.scrollTop <= 900) || box.scrollTop === 0){
			this.scrollHandler();
		}
	}
	
	componentDidMount(){
	
		this.interval = setInterval(() => {
			this.mightScroll();
		}, 2000);
			
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
    render() {
		const { userId, userName, connectionData, messages} = this.props.params
		const {sendHandler, messageHandler} = this.props
		if(!connectionData){
			return (<div id="messageDiv">An error has occurred</div>);
		} 

		if (!this.props.params.messages) {
			<div id="messageDiv">
				<h4 id="connectName">
					<img id="connectAvatar" src={`data:image/png;base64,${connectionData.profilePicture}`}/>
					{connectionData.name} 
					<p id="connectEmail"> {connectionData.email}</p>
				</h4>
				<div id="chatContainer" onClick = {this.scrollHandler}>
					
				</div>
				<form id="messageForm">
					<input id="userMessageInput" type="text" placeholder="Type a message" onChange={messageHandler}></input>
					<Button id="sendButton" variant="outlined" onClick={sendHandler}>SEND</Button>
				</form>
			</div>
		}
        return (
            <div id="messageDiv">
				<h4 id="connectName">
					<img id="connectAvatar" src={`data:image/png;base64,${connectionData.profilePicture}`}/>
					{connectionData.name} 
					<p id="connectEmail"> {connectionData.email}</p>
				</h4>
				<div id="chatContainer" onClick = {this.scrollHandler}>
					{messages.map((message) => {
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