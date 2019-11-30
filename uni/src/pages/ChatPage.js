
import React from 'react';
import Login from '../pages/Login'
import {getConnectedStudents} from '../lib/students';
import NavBar from '../components/navbar';
import MessageContainer from '../components/MessageContainer'
import Avatar from '@material-ui/core/Avatar';
import PermissionDenied from './PermissionDenied';
import constants from '../lib/constants';
import { SessionContext, getSessionCookie} from "../session";

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
		}
		//setInterval(() => this.chatUpdate(), 1000)
		/*
		this.getMessages().then((result) => {
			this.setState({
				connections: result.messages
			})
			
		}).catch((error) => {
			removeSessionCookie()
			console.log(error)  // handle any rejects that come up in the chain.
		})
		*/
	}
	
	getMessages(){
		return new Promise((resolve, reject) => {
			fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/getConnections', {
				method: "GET",
				credentials: 'include',
				headers: {
				"Access-Control-Allow-Credentials": "true",
				"Content-type": "application/json; charset=UTF-8"
            }})
            .then(res => res.json())
            .then(
                  
              (result) => {
                  console.log('connections: ', result)
                  resolve({
                      connections: result
                  })
              },
              (error) => {
                  reject('issue with getting resource')
              }
          )
      })
      
  }


	renderCondition() {
		//console.log("render condition connections", this.props)
		const session = getSessionCookie()
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