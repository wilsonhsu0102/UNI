
import React from 'react';
import Login from '../pages/Login'
import ConnectionsList from '../components/ConnectionsList'
import {getConnectedStudents} from '../lib/students';
import NavBar from '../components/navbar';
import PermissionDenied from './PermissionDenied'
import constants from '../lib/constants'

class CardQueue extends React.Component {
  state = {
    connections: []
  }

  componentDidMount(){
    this.getConnections().then((result) => {
        this.setState({
          connections: result.connections
        })
        
    }).catch((error) => {
        console.log(error)  // handle any rejects that come up in the chain.
    })
}

  getConnections(){
      return new Promise((resolve, reject) => {
          fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/getConnections', {
              method: "GET",
              headers: {
              "access-control-allow-origin" : "*",
              "Content-type": "application/json; charset=UTF-8"
              }})
              .then(res => res.json())
              .then(
                  
              (result) => {
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

/*
  renderCondition() {
      console.log("render condition connections", this.props)
      const session = getSessionCookie()
      if (session === undefined){
          return <Login></Login>
      } else {
          return [<NavBar id ={this.props.location.state.id}></NavBar>,<ConnectionsList students = {this.state.connections}></ConnectionsList>]
      } 
  }*/

  render() {
    
    return [<NavBar></NavBar>,<ConnectionsList students = {this.state.connections}></ConnectionsList>]

  }
}
export default CardQueue;