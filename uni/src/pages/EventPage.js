import React from 'react';
import './EventPage.css'
import EventPhoto from '../components/EventPhoto';
import GoogleMapMock from '../components/GoogleMap';
import NavBar from '../components/navbar';
import constants from '../lib/constants'
import Login from '../pages/Login'
import { SessionContext, getSessionCookie, setSessionCookie, removeSessionCookie } from "../session";

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
        this.id = this.props.id;
        this.name = "Wilson Hsu"
        this.hostProfile = require("../images/profilepic.jpg")
        this.state = {
            authenticated: true,
            photo: event2.eventCoverPhoto,
            attendees: []
        }
    }

    componentDidMount() {
        this.getEventById()
        .then(event => {
            this.setState({
                eventName: event.eventName,
                description: event.description,
                location: event.location,
                datetime: event.date,
                authenticated: true
            })
            // this.photo = event.eventCoverPhoto;
        })
        .catch(err => {
            removeSessionCookie()
            console.log(err)
        })
        this.getAttendees()
        .then(data => {
            console.log('_EQWERQRQWTQWT_____')
            console.log(typeof(data))
            console.log(data)
            this.setState({
                attendees: data
            })
        })
        .catch(err => {
            removeSessionCookie()
            console.log(err)
        })
    }

    getEventById() {
        return new Promise((resolve, reject) => {
            fetch(constants.HTTP + constants.HOST + constants.PORT + `/events/event?id=${this.id}`, {
                method: "GET",
                credentials: 'include',
                headers: {
                "Access-Control-Allow-Credentials": "true",
                "Content-type": "application/json; charset=UTF-8"
                }})
                .then(res => res.json())
                .then(
                    
                (result) => {
                    console.log(typeof(result))
                    console.log(result)
                    resolve(result)
                },
                (error) => {
                    reject(error)
                }
            )
        })
    }

    getAttendees() {
        return new Promise((resolve, reject) => {
            fetch(constants.HTTP + constants.HOST + constants.PORT + `/student/getAttendees?eventId=${this.id}`, {
                method: "GET",
                credentials: 'include',
                headers: {
                "Access-Control-Allow-Credentials": "true",
                "Content-type": "application/json; charset=UTF-8"
                }})
                .then(res => res.json())
                .then(
                        
                (result) => {
                    resolve(result)
                },
                (error) => {
                    reject(error)
                })
            })
    }

    goToProfile(profileId) {
        window.location.href='http://localhost:3000/profile/' + profileId;
    }

    setUpAttendees() {
        /// Get attendees from server
        // code below requires server call
        this.rows = [];
        const length = this.state.attendees.length;
        for (let i = 0; i < Math.ceil(length / 3); i++) {
            const items = []
            for (let j = 0; (i * 3 + j < length) && j < 3; j++) {
                console.log(this.state.attendees[i * 3 + j])
                items.push(<td className="items" key={i * 3 + j}><button className="people" onClick={this.goToProfile.bind(this, this.state.attendees[i * 3 + j]._id)}>{this.state.attendees[i * 3 + j].name}</button></td>)
            }
            this.rows.push(<tr key={i}>{items}</tr>)
        }
        
    }

    renderCondition = () => {
        const session = getSessionCookie()
        if (session) {
            this.host = session;
            return (
                [<NavBar id={this.id} key={"NavBar"}></NavBar>, <div className="eventPage" key={"eventPage" + this.id}> 
                <div className="container"> 
                    <div className="eventBlock"> 
                        <div className="name"> 
                            {this.state.eventName}
                        </div>
                        <div className="coverPhoto"> 
                            <EventPhoto photo={this.state.photo}/> 
                        </div>
                        <h3> Event Description: </h3>
                        <div className="description">
                            {this.state.description}
                        </div>
    
                    </div>
                    <div className="sideBlock">
                        <div className="hostProfile">
                            <button className="profileButton" onClick={this.goToProfile.bind(this, 1)}> <img src={this.hostProfile} alt="profile for host"/> </button>
                            <h3 className="hostName"> Host: {this.name} </h3>
                            <div className='eventDetail'>
                                <p> Location: {this.state.location} </p>
                                <p> Date: {this.state.datetime} </p>
                            </div>
                        </div>
                        <h3 id='attendeesTitle'> Attendees: </h3>
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
        removeSessionCookie()
        return <Login></Login>
      }

    render()  {
        this.setUpAttendees();
        return this.renderCondition()
      }
  }
export default Event;