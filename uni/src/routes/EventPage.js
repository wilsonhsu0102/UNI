import React from 'react';
import './EventPage.css'
import { Link } from 'react-router-dom';
import HostProfile from './components/HostProfile';
import EventPhoto from './components/EventPhoto';
import GoogleMap from './components/GoogleMap';

const event2 = {"eventName": "FREE! BBT!", "hostId": "2", "eventCoverPhoto": "N/A"
, "eventLocation": "SS", "Attendees": [{"name": "Jay Chou"}, {"name": "Rich Brian"}, {"name": "Higher Brothers"}, {"name": "BTS"}, {"name": "Twice"}, {"name": "Black Pink"}, {"name": "Shawn Mendes"}, {"name": "Wilson Hsu"}], 
"eventDescription": "A random nice guy is giving out free bubble tea to all UofT students, because we're all suffering and sleep deprived."}

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.id = Number(this.props.id);
        this.eventName = event2.eventName;
        this.description = event2.eventDescription;
        this.attendees = event2.Attendees;
    }

    render()  {
        const items = [];
        for (const [index, value] of this.attendees.entries()) {
            items.push(<li className="item" key={index}> <button className="people"> {value.name} </button> </li>)
        }
        return (
            <div className="eventPage"> 
                <div className="container"> 
                    <div className="eventBlock"> 
                        <div className="name"> 
                            {this.eventName}
                        </div>
                        <div className="hostProfile"> 
                            <h3> Hosted by: </h3>
                            <HostProfile/>
                        </div>
                        <div className="coverPhoto"> 
                            <EventPhoto/> 
                        </div>
                        <h3> Event Description: </h3>
                        <div className="description">
                            {this.description}
                        </div>

                    </div>
                    <div className="sideBlock">
                        <h3> Event Location: </h3>
                        <div className="googleMap">
                            <GoogleMap/>
                        </div>
                        <div className="attendees">
                            <ul className="buttons">
                                <li> 
                                    Attendees:
                                </li>
                                {items}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
      }
  }
export default Event;