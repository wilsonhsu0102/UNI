
import React from 'react';
import Login from '../pages/Login'
import {getConnectedStudents} from '../lib/students';
import NavBar from '../components/navbar';
import PermissionDenied from './PermissionDenied'
import constants from '../lib/constants'
import { SessionContext, getSessionCookie, setSessionCookie, removeSessionCookie } from "../session";


class ChatPage extends React.Component {
	
	componentDidMount(){
		console.log("mounting page")
		console.log(this.props.location.state);
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
      if (!session){
          return <Login></Login>
      } else if(!this.props.location.state) {
          return [<div><NavBar></NavBar><h4>CANNOT BE ACCESSED DIRECTLY</h4></div>]
      } else {
          return [<NavBar></NavBar>]
      } 
  }

  render() {
    
    return this.renderCondition()
  }
}

export default ChatPage;