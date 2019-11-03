
import React, {Component} from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import CardList from './CardList';
import {getUnconnectedStudents, getConnectedStudents, updateNewConnection} from '../lib/students';
import PermissionDenied from '../routes/PermissionDenied'

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

  renderCondition = (id) => {
    console.log("renderCondition",id)
    if (parseInt(id) >= 0) {
      console.log("id > 0",id)
      return <CardList id = {id} students={ this.state.students } rejectStudent = {this.rejectStudent} connectStudent = {this.connectStudent}></CardList>
    }
    return <PermissionDenied></PermissionDenied>
  }

  render() {
    const { id } = this.props

    return (
      //<div></div>
      this.renderCondition(id)
    );
  }
}
export default CardQueue;