
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ChatMessage from './ChatMessage'
import './MessageContainer.css'
import constants from '../lib/constants';
const datetime = require('date-and-time');

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

	messageChangeHandler = event => {
        this.setState({
			message: event.target.value
        });
	}
	
	messageRequest (messObj){
		return new Promise((resolve, reject) => {
			fetch(constants.HTTP + constants.HOST + constants.PORT + '/chats/sendMessage', {
				method: "POST",
				body: JSON.stringify(messObj),
				credentials: 'include',
				headers: {
				"Access-Control-Allow-Credentials": "true",
				"Content-type": "application/json; charset=UTF-8"
			}})
			.then(res => res.json())
			.then(
				(result) => {
					//console.log('messageObject: ', result);
					resolve(result);
				},
				(error) => {
					reject('issue with getting resource');
				}
			)
		})
		
	}
	
	sendHandler = event => {
		if (this.state.message !== ""){
			const now = new Date();
			const messObj = {
				userId: this.state.userId,
				message: this.state.message,
				timestamp: now,
				combinedId: this.state.combinedId
			}
			this.messageRequest(messObj).then((result) => {
				if (this.state.timestamp === null){
					const now = datetime.parse(new Date(), 'YYYY/MM/DD HH:mm:ss');
					this.setState({
						messages: result.messages,
						timestamp: now,
						message: ""
					});
				}
				else if((result.timestamp !== null)){
					this.setState({
						messages: result.messages,
						timestamp: result.timestamp,
						message: ""
					});
				}
				document.querySelector("#userMessageInput").value = "";
			}).catch((error) => { console.log(error)});
		}
	}
	
    render() {
		const { userId, userName, connectionData, messages} = this.props.params
		if(!connectionData){
			return (<div id="messageDiv">An error has occurred</div>);
		} 

		if (!this.props.params.messages) {
			return (<div id="messageDiv">
				<h4 id="connectName">
					<img id="connectAvatar" src={`data:image/png;base64,${connectionData.profilePicture}`}/>
					{connectionData.name} 
					<p id="connectEmail"> {connectionData.email}</p>
				</h4>
				<div id="chatContainer" onClick = {this.scrollHandler}>
					
				</div>
				<form id="messageForm">
					<input id="userMessageInput" type="text" placeholder="Type a message" onChange={this.messageChangeHandler}></input>
					<Button id="sendButton" variant="outlined" onClick={this.sendHandler}>SEND</Button>
				</form>
			</div>)
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
					<input id="userMessageInput" type="text" placeholder="Type a message" onChange={this.messageHandler}></input>
					<Button id="sendButton" variant="outlined" onClick={this.sendHandler}>SEND</Button>
				</form>
            </div>
        );
    }
}

export default MessageContainer;