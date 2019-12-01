import React from 'react';

class EventPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.photo = this.props.photo;
    }

    getEventPhoto(photo) {
        /// Get attendees from server
        // code below requires server call
        if (this.photo === '') {
            this.eventPhoto = require('../images/coverPhoto3.jpg');
        } else {
            this.eventPhoto = require(this.photo)
        }
        
    }

    render() {
        this.getEventPhoto(this.props.photo);
        return (
                <img id="eventPic" src={this.eventPhoto} alt="Cover for the event"/> 
        )
    }
}

export default EventPhoto;