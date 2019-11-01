import React from 'react';
import './EventPage.css'
import { Link } from 'react-router-dom';
import HostProfile from './components/HostProfile';
import EventPhoto from './components/EventPhoto';
import GoogleMapMock from './components/GoogleMap';

const event2 = {"eventName": "FREE! BBT!", "hostId": "2", "eventCoverPhoto": "N/A"
, "eventLocation": "SS", "Attendees": [{'name': 'Johnny Depp'}, {'name': 'Arnold Schwarzenegger'}, {'name': 'Jim Carrey'}, {'name': 'Emma Watson'}, {'name': 'Daniel Radcliffe'}, {'name': 'Leonardo DiCaprio'}, {'name': 'Tom Cruise'}, {'name': 'Brad Pitt'}, {'name': 'Morgan Freeman'}, {'name': 'Tom Hanks'}], 
"eventDescription": "SAMPLE POST: THE FREE BBT PARTY IS BACK AGAIN THIS YEAR!! Already feeling stressed out about school, missing your family and friends from home? Still single and want to meet someone special? Or just wants to have fun but don’t know where to go? DON’T WORRY We got you covered!"
 + "Next Friday come party with us! With bbt pong and other games available! We will be serving ALL YOU CAN DRINK bbt to test you limit! And maybe you might just be able to meet that special one on Friday night~ Don’t miss out on the fun and come join us at the party!!"}

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.id = Number(this.props.id);
        this.eventName = event2.eventName;
        this.description = event2.eventDescription;
        this.attendees = event2.Attendees;
    }

    render()  {
        // const items = [];
        // for (const [index, value] of this.attendees.entries()) {
        //     items.push(<td className="item" key={index}> <button className="people"> {value.name} </button> </td>)
        // }
        const rows = [];
        const length = this.attendees.length;
        for (let i = 0; i < Math.ceil(length / 3); i++) {
            let items = [];
            for (let j = 0; (i * 3 + j < length) && j < 3; j++) {
                items.push(<td className="items" key={i * 3 + j}><button className="people">{this.attendees[i * 3 + j].name}</button></td>)
            }
            rows.push(<tr key={i}>{items}</tr>)
        }
        console.log(rows)
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
                            <GoogleMapMock/>
                            
                        </div>
                        <h3> Attendees: </h3>
                        <div className="attendees">
                            <table className="table">
                                <tbody> 
                                    {rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
      }
  }
export default Event;