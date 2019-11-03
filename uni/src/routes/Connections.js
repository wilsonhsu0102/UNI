
import React, {Component} from 'react';
import ConnectionsList from '../components/ConnectionsList'
import {getConnectedStudents} from '../lib/students';
import NavBar from '../components/navbar';
import PermissionDenied from '../routes/PermissionDenied'


class CardQueue extends React.Component {
  state = {
    connections: getConnectedStudents()
  }


  renderCondition() {
      console.log("render condition connections", this.props)
      if (this.props.id == null && this.props.location == null){
          return <PermissionDenied></PermissionDenied>
      }
      if (parseInt(this.props.location.state.id) >= 0) {
          return [<NavBar id ={this.props.location.state.id}></NavBar>,<ConnectionsList students = {this.state.connections}></ConnectionsList>]
      } else {
          return <PermissionDenied></PermissionDenied>
      }
  }

  render() {
    
    return (
      this.renderCondition()
      //<div></div>
      //<CardList students={ this.state.students } rejectStudent = {this.rejectStudent} connectStudent = {this.connectStudent}></CardList>
    );
  }
}
export default CardQueue;