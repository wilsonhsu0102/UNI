import React from 'react';
import './EventPage.css'
import { Link } from 'react-router-dom';
import HostProfile from '../components/HostProfile';
import EventPhoto from '../components/EventPhoto';
import GoogleMapMock from '../components/GoogleMap';
import NavBar from '../components/navbar';


const event1 = {"eventName": "FREE! BBT!", "hostId": "1", "eventCoverPhoto": "N/A"
, "eventLocation": "SS", "Attendees": [{'name': 'Wilson Hsu'}, {'name': 'Johnny Depp'}, {'name': 'Arnold Schwarzenegger'}, {'name': 'Jim Carrey'}, {'name': 'Emma Watson'}, {'name': 'Daniel Radcliffe'}, {'name': 'Leonardo DiCaprio'}, {'name': 'Tom Cruise'}, {'name': 'Brad Pitt'}, {'name': 'Morgan Freeman'}, {'name': 'Tom Hanks'}], 
"eventDescription": "SAMPLE POST: THE FREE BBT PARTY IS BACK AGAIN THIS YEAR!! Already feeling stressed out about school, missing your family and friends from home? Still single and want to meet someone special? Or just wants to have fun but don’t know where to go? DON’T WORRY We got you covered!"
 + "Next Friday come party with us! With bbt pong and other games available! We will be serving ALL YOU CAN DRINK bbt to test you limit! And maybe you might just be able to meet that special one on Friday night~ Don’t miss out on the fun and come join us at the party!!"}

 const event2 = {"eventName": "FREE! Donuts!", "hostId": "2", "eventCoverPhoto": './images/coverPhoto3.jpg'
, "eventLocation": "BA", "Attendees": [{'name': 'Wilson Hsu'}, {'name': 'Johnny Depp'}, {'name': 'Arnold Schwarzenegger'}, {'name': 'Jim Carrey'}, {'name': 'Emma Watson'}, {'name': 'Daniel Radcliffe'}, {'name': 'Leonardo DiCaprio'}, {'name': 'Tom Cruise'}, {'name': 'Brad Pitt'}, {'name': 'Morgan Freeman'}, {'name': 'Tom Hanks'}], 
"eventDescription": "SAMPLE POST: THE FREE Donuts PARTY IS BACK AGAIN THIS YEAR!! Already feeling stressed out about school, missing your family and friends from home? Still single and want to meet someone special? Or just wants to have fun but don’t know where to go? DON’T WORRY We got you covered!"
 + "Next Friday come party with us! With Donuts pong and other games available! We will be serving ALL YOU CAN EAT Donuts to test you limit! And maybe you might just be able to meet that special one on Friday night~ Don’t miss out on the fun and come join us at the party!!"}

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.id = Number(this.props.id);
        /// Get event info from server
        if (this.id === 1) {
            this.eventName = event1.eventName;
            this.description = event1.eventDescription;
            this.attendees = event1.Attendees;
            this.photo = event1.eventCoverPhoto;
        } else {
            this.eventName = event2.eventName;
            this.description = event2.eventDescription;
            this.attendees = event2.Attendees;
            this.photo = event2.eventCoverPhoto;
        }
        
    }

    // componentDidMount () {
    //     // for (let i = 0; i < this.rows.lenght; i++) {

    //     // }
    //     const item = document.querySelector('td');
    //     const button = item.getElementsByTagName('button')[0];
    //     console.log(item);
    //     console.log(button.attributes.profileid.value);
    //     // console.log(button.props.profileid);
    //     button.addEventListener('click', this.goToProfile(button.attributes.profileid.value));
    // }

    goToProfile(profileId) {
        window.location.href='http://localhost:3000/profile/' + profileId;
    }

    setUpAttendees() {
        /// Get attendees from server
        // code below requires server call
        this.rows = [];
        const length = this.attendees.length;
        for (let i = 0; i < Math.ceil(length / 3); i++) {
            const items = [];
            for (let j = 0; (i * 3 + j < length) && j < 3; j++) {
                if (i * 3 + j === 0) { // This is to demonstrate that our link will link to the user profile.
                    items.push(<td className="items" key={i * 3 + j}><button className="people" onClick={this.goToProfile.bind(this, i*3+j)}>{this.attendees[i * 3 + j].name}</button></td>)
                } else {
                    items.push(<td className="items" key={i * 3 + j}><button className="people">{this.attendees[i * 3 + j].name}</button></td>)
                }
                
            }
            this.rows.push(<tr key={i}>{items}</tr>)
        }
    }

    render()  {
        this.setUpAttendees();
        return (
            [<NavBar></NavBar>,
            <div className="eventPage"> 
                <div className="container"> 
                    <div className="eventBlock"> 
                        <div className="name"> 
                            {this.eventName}
                        </div>
                        <div className="hostProfile"> 
                            <h3> Hosted by: </h3>
                            <HostProfile id={this.id}/>
                        </div>
                        <div className="coverPhoto"> 
                            <EventPhoto photo={this.photo}/> 
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
                                    {this.rows}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>]
        );
      }
  }
export default Event;