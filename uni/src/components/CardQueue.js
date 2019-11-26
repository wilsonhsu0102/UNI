
import React from 'react';
import CardList from './CardList';
import Login from '../pages/Login'
import NavBar from '../components/navbar'
import {getUnconnectedStudents, getConnectedStudents, updateNewConnection} from '../lib/students';
import PermissionDenied from '../pages/PermissionDenied'
import { SessionContext, getSessionCookie, setSessionCookie } from "../session";

class CardQueue extends React.Component {
  state = {
    students: getUnconnectedStudents(),
    connections: getConnectedStudents()
  }

  
  
  connectStudent = (student) => {
    
    console.log('connecting with student')

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
  }

  rejectStudent = (student) => {
    console.log('removing student from cards')

    const filteredStudents = this.state.students.filter((s) => {
      return s !== student 
    })

    this.setState({
      students: filteredStudents
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

    return [<NavBar id = {id}></NavBar>, <CardList students={ this.state.students } rejectStudent = {this.rejectStudent} connectStudent = {this.connectStudent}></CardList>]

  }
}
export default CardQueue;