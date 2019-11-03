
import React, {Component} from 'react';
import Flippy, { FrontSide, BackSide } from 'react-flippy';
import CardList from './CardList';
import {getUnconnectedStudents, getConnectedStudents, updateNewConnection} from '../lib/students';

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

  render() {
    
    return (
      //<div></div>
      <CardList students={ this.state.students } rejectStudent = {this.rejectStudent} connectStudent = {this.connectStudent}></CardList>
    );
  }
}
export default CardQueue;