import React from 'react';
import { Link } from 'react-router-dom';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        console.log("This is the event page for event id" + this.id);
    }
    render()  {
        return (
             <h1>This is the Event page for event id {this.id} </h1>
          );
      }
  }
export default Event;