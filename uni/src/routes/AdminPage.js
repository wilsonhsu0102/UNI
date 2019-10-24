import React from 'react';
import { Link } from 'react-router-dom';

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        console.log("This is the admin page for admin id" + this.id);
    }
    render()  {
        return (
             <h1>This is the admin page for admin id {this.id} </h1>
          );
      }
  }
export default Admin;