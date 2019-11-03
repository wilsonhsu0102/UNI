
import React, {Component} from 'react';
import ConnectionsList from '../components/ConnectionsList'
import {getConnectedStudents} from '../lib/students';
import NavBar from '../components/navbar';

class CardQueue extends React.Component {
  state = {
    connections: getConnectedStudents()
  }


  render() {
    
    return (
        [<NavBar></NavBar>,<ConnectionsList students = {this.state.connections}></ConnectionsList>]
      //<div></div>
      //<CardList students={ this.state.students } rejectStudent = {this.rejectStudent} connectStudent = {this.connectStudent}></CardList>
    );
  }
}
export default CardQueue;