
import React from 'react';
import Login from '../pages/Login'
import ConnectionsList from '../components/ConnectionsList'
import {getConnectedStudents} from '../lib/students';
import NavBar from '../components/navbar';
import PermissionDenied from './PermissionDenied'
import constants from '../lib/constants'
import { SessionContext, getSessionCookie, setSessionCookie } from "../session";


class CardQueue extends React.Component {
  state = {
    connections: [],
    authenticated: false
  }

  componentDidMount(){
    console.log("mounting page")
    this.getConnections().then((result) => {
        this.setState({
          connections: result.connections,
          authenticated: true
        })
        
    }).catch((error) => {
        console.log(error)  // handle any rejects that come up in the chain.
    })
}
  
  getConnections(){
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
      //const session = getSessionCookie()
      if (!this.state.authenticated){
          return <Login></Login>
      } else {
          return [<NavBar></NavBar>,<ConnectionsList students = {this.state.connections}></ConnectionsList>]
      } 
  }

  render() {
    
    return this.renderCondition()
  }
}
export default CardQueue;