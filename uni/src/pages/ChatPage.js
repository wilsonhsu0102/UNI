
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
		timestamp: null
		
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
			/*
			//Retrieves messages if data exists, and creates it if it doesn't
			this.checkChatExists(idObject).then((result) => {
				if(result === {}){
					console.log("Something went wrong");
				}
				else{
					const now = new Date();
					this.setState({
						connections: result.messages,
						timestamp: now
					});
				}
			}).catch((error) => {
				removeSessionCookie();
				console.log(error)  // handle any rejects that come up in the chain.
			})
			
			
			//Periodically checks if there are new messages to be added
			this.interval = setInterval(() => 
			this.getMessages(idObject).then((result) => {
				if (this.state.timestamp === null){
					const now = new Date();
					this.setState({
						connections: result.messages,
						timestamp: now
					});
				}
				else if(datetime.subtract(result.timestamp, this.state.timestamp).toSeconds() >= 0){
					this.setState({
						connections: result.messages,
						timestamp: result.timestamp
					})
				}
			}).catch((error) => {
				removeSessionCookie()
				console.log(error)  // handle any rejects that come up in the chain.
			}), 1000);
			*/
		}
		
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
	
	getMessages(idObject){
		return new Promise((resolve, reject) => {
			fetch(constants.HTTP + constants.HOST + constants.PORT + '/chats/getMessages', {
				method: "GET",
				body: JSON.stringify(idObject),
				credentials: 'include',
				headers: {
				"Access-Control-Allow-Credentials": "true",
				"Content-type": "application/json; charset=UTF-8"
            }})
            .then(res => res.json())
            .then(
				(result) => {
					console.log('messageObject: ', result)
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
		console.log(session);
		if (!session){
			return <Login></Login>
		} else if(!this.props.location.params) {
			return [<NavBar></NavBar>, <h4>CANNOT BE ACCESSED DIRECTLY</h4>]
		} else {
			return [
			<NavBar></NavBar>, <MessageContainer params = {this.state}></MessageContainer>]
		} 
	}

	render() {
		return this.renderCondition()
	}
}

export default ChatPage;