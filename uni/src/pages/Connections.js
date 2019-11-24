
import React from 'react';
import ConnectionsList from '../components/ConnectionsList'
import {getConnectedStudents} from '../lib/students';
import NavBar from '../components/navbar';
import PermissionDenied from './PermissionDenied'
import { SessionContext, getSessionCookie, setSessionCookie } from "../session";


class CardQueue extends React.Component {
  state = {
    connections: getConnectedStudents()
  }


  renderCondition() {
      console.log("render condition connections", this.props)
      const session = getSessionCookie()
      if (!session){
          return <PermissionDenied></PermissionDenied>
      } else {
          return [<NavBar id ={this.props.location.state.id}></NavBar>,<ConnectionsList students = {this.state.connections}></ConnectionsList>]
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