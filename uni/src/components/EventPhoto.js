import React from 'react';

class EventPhoto extends React.Component {
    render() {
        return (
            <div> 
                <img id="eventPic" src={require('../images/coverPhoto3.jpg')} alt="Cover for the event"/> 
            </div>
        )
    }
}

export default EventPhoto;