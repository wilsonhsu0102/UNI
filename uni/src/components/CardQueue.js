
import React from 'react';
import CardList from './CardList';
import Login from '../pages/Login'
import NavBar from '../components/navbar'
import {getUnconnectedStudents, getConnectedStudents, updateNewConnection} from '../lib/students';
import PermissionDenied from '../pages/PermissionDenied'
import { SessionContext, getSessionCookie, setSessionCookie } from "../session";
import constants from '../lib/constants'

class CardQueue extends React.Component {
  state = {
    deck: []
  }

  componentDidMount(){
    this.getDeck().then((result) => {
        this.setState({
          deck: result.deck
        })
        
    }).catch((error) => {
        console.log(error)  // handle any rejects that come up in the chain.
    })
}

  getDeck(){
      return new Promise((resolve, reject) => {
          fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/getDeck', {
              method: "GET",
              credentials: 'include',
              headers: {
              "Access-Control-Allow-Credentials": "true",
              "Content-type": "application/json; charset=UTF-8"
              }})
              .then(res => res.json())
              .then(
                  
              (result) => {
                  resolve({
                      deck: result.notConnected
                  })
              },
              (error) => {
                  reject('issue with getting resource')
              }
          )
      })
      
  }
  
  
  connectStudent = (student) => {
    
    console.log('connecting with student')
    /*
      const newConnection = this.props
      this.state.connections.push(newConnection)
      const filteredStudents = this.state.students.filter((s) => {
        return s !== student 
      })

      this.setState({
        students: filteredStudents
      })
      updateNewConnection(student)
      console.log("student", this.state.students)
      console.log("filtered", filteredStudents)
      */
     const opts = {
      id: student._id
    }
    fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/connect', {
          method: 'post',
          credentials: 'include',
          body: JSON.stringify(opts),
          headers: {
          "Access-Control-Allow-Credentials": "true",
          "Content-type": "application/json; charset=UTF-8"
          }})
          .then(res => res.json())
          .then(
          (result) => {
              const filteredDeck = this.state.deck.filter((s) => {
                return s !== student 
              })
        
              this.setState({
                deck: filteredDeck
              })
          },
          (error) => {
              alert("An error has occured")
          }
      )

  }

  rejectStudent = (student) => {
    console.log('removing student from cards')

    const filteredStudents = this.state.deck.filter((s) => {
      return s !== student 
    })

    this.setState({
      deck: filteredStudents
    })

  }
/*
  renderCondition = (id) => {
    const session = getSessionCookie()
    if (session !== undefined) {
      console.log("session",session)
      return [<NavBar id = {id}></NavBar>, <CardList students={ this.state.students } rejectStudent = {this.rejectStudent} connectStudent = {this.connectStudent}></CardList>]
    }
    return <Login></Login>
  }
*/
  render() {
    const { id } = this.props

    return [<NavBar id = {id}></NavBar>, <CardList students={ this.state.deck } rejectStudent = {this.rejectStudent} connectStudent = {this.connectStudent}></CardList>]

  }
}
export default CardQueue;