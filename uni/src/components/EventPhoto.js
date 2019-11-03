import React from 'react';

class EventPhoto extends React.Component {
    constructor(props) {
        super(props);
    }

    getEventPhoto(photo) {
        /// Get attendees from server
        // code below requires server call
        if (photo === "N/A") {
            this.eventPhoto = require('../images/defaultCoverPhoto.png');
        } else {
            this.eventPhoto = require('../images/coverPhoto3.jpg');
        }
    }

    render() {
        this.getEventPhoto(this.props.photo);
        return (
            <div> 

                <img id="eventPic" src={this.eventPhoto} alt="Cover for the event"/> 
            </div>
        )
    }
}

export default EventPhoto;