
import React from 'react';
import Login from '../pages/Login'
import {getConnectedStudents} from '../lib/students';
import NavBar from '../components/navbar';
import MessageContainer from '../components/MessageContainer'
import Avatar from '@material-ui/core/Avatar';
import PermissionDenied from './PermissionDenied';
import constants from '../lib/constants';
import { SessionContext, getSessionCookie, removeSessionCookie} from "../session";

const datetime = require('date-and-time');

class ChatPage extends React.Component {
	state = {
		userId: "",
		userName: "",
		connectionData: null,
		messages: [],
		timestamp: null,
		message: "",
		combinedId: ""
		
	}
	
	componentDidMount(){
		console.log("mounting page")
		console.log(this.props.location.params);
		if(this.props.location.params){
			const {student, selfId, selfName} = this.props.location.params;
			this.setState({
				userId: selfId,
				userName: selfName,
				connectionData: student
			})
			
			const idObject = {
				id1: selfId,
				id2: student._id
			}
			//Retrieves messages if data exists, and creates it if it doesn't
			this.checkChatExists(idObject).then((result) => {
				if(result === {}){
					console.log("Something went wrong");
				}
				else{
					const now = datetime.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
					this.setState({
						messages: result.messages,
						timestamp: now,
						combinedId: result.combinedId
					});
					console.log(result.combinedId);
					
				}
			}).catch((error) => {
				removeSessionCookie();
				console.log(error)  // handle any rejects that come up in the chain.
			});
			
			//Periodically checks if there are new messages to be added
			
			this.interval = setInterval(() => {
				if(this.state.combinedId !== null){
					this.getMessages(this.state.combinedId).then((result) => {
						if (this.state.timestamp === null){
							const now = datetime.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
							this.setState({
								messages: result.messages,
								timestamp: now
							});
							console.log(this.state.messages);
						}
						else if((result.timestamp !== null)){
							this.setState({
								messages: result.messages,
								timestamp: result.timestamp
							})
							console.log(this.state.messages);
						}
					}).catch((error) => { console.log(error)});
				}}, 1000);
			
		}
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
	}

	checkChatExists(idObject){
		return new Promise((resolve, reject) => {
			fetch(constants.HTTP + constants.HOST + constants.PORT + '/chats/checkExists', {
				method: "POST",
				body: JSON.stringify(idObject),
				credentials: 'include',
				headers: {
				"Access-Control-Allow-Credentials": "true",
				"Content-type": "application/json; charset=UTF-8"
            }})
            .then(res => res.json())
            .then(
				(result) => {
					console.log('messageObject: ', result);
					resolve(result);
				},
				(error) => {
					reject('issue with getting resource');
				}
			)
		})
	}
	
	getMessages(combinedId){
		return new Promise((resolve, reject) => {
			fetch(constants.HTTP + constants.HOST + constants.PORT + '/chats/getMessages/' + combinedId, {
				method: "GET",
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
	
	messageChangeHandler = event => {
        this.setState({
			message: event.target.value
        });
    }
	
	sendHandler = event => {
		if (this.state.message !== ""){
			const now = datetime.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
			const messObj = {
				userId: this.state.userId,
				message: this.state.message,
				timestamp: now,
				combinedId: this.state.combinedId
			}
			this.messageRequest(messObj).then((result) => {
				if (this.state.timestamp === null){
					const now = datetime.format(new Date(), 'YYYY/MM/DD HH:mm:ss');
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
	renderCondition() {
		//console.log("render condition connections", this.props)
		const session = getSessionCookie();
		if (!session){
			return <Login></Login>
		} else if(!this.props.location.params) {
			return [<NavBar></NavBar>, <h4>CANNOT BE ACCESSED DIRECTLY</h4>]
		} else {
			const {student, selfId, selfName} = this.props.location.params;
			const params = {
				userName: selfName,
				userId: selfId,
				connectionData: student
			}

			return [
			<NavBar></NavBar>, 
			<MessageContainer params = {params}
							  messages = {this.state.messages}
							  sendHandler = {this.sendHandler} 
							  messageHandler = {this.messageChangeHandler}></MessageContainer>]
		}
	}

	render() {
		return this.renderCondition()
	}
}

export default ChatPage;