import React from 'react';

class EventPhoto extends React.Component {
    constructor(props) {
        super(props);
        this.photo = this.props.photo;
        console.log(this.photo)
    }

    getEventPhoto() {
        this.eventPhoto = require('../../public' + this.photo)
    }

    render() {
        this.getEventPhoto();
        return (
                <img id="eventPic" src={this.eventPhoto} alt="Cover for the event"/> 
        )
    }
}

export default EventPhoto;