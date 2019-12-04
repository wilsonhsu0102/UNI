
import React from 'react';
import { Router, Route, browserHistory, IndexRoute} from 'react-router'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChatMessage from './ChatMessage'
import './MessageContainer.css'

/* Component for the Message Container */
class MessageContainer extends React.Component {
	state = {
		messages: []
	}
	
	scrollHandler = event => {
		let box = document.querySelector("#chatContainer");
		if (!box) {
			box.scrollTop = box.scrollHeight;
		}
		
    }
	
	mightScroll(){
		let box = document.querySelector("#chatContainer");
		if ((box.scrollHeight - box.scrollTop <= 900) || box.scrollTop === 0){
			this.scrollHandler();
		}
	}
	
	componentDidMount(){
		
		this.interval = setInterval(() => {
			if (!this.props.messages) {
				this.setState({
					messages: []
				});
			}
			else{
				this.setState({
					messages: this.props.messages
				});
			}
			//this.mightScroll();
			
		}, 1000);
			
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}
	
    render() {
		const { userId, userName, connectionData} = this.props.params
		const {sendHandler, messageHandler} = this.props
		console.log(this.props.params)
		if(!connectionData){
			return (<div id="messageDiv">Loading Page. Please Wait.</div>);
		}
        return (
            <div id="messageDiv">
				<h4 id="connectName">
					<img id="connectAvatar" src={`data:image/png;base64,${connectionData.profilePicture}`}/>
					{connectionData.name} 
					<p id="connectEmail"> {connectionData.email}</p>
				</h4>
				<div id="chatContainer" onClick = {this.scrollHandler}>
					{this.state.messages.map((message) => {
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