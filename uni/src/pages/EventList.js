import React from 'react';
import './EventList.css'
import NavBar from '../components/navbar';
import constants from '../lib/constants'
import Login from '../pages/Login'
import {Modal} from "react-bootstrap"
import {FormGroup, FormControl} from "react-bootstrap";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { SessionContext, getSessionCookie, setSessionCookie, removeSessionCookie } from "../session";
import PacmanLoader from 'react-spinners/PacmanLoader';

class EventList extends React.Component {
    constructor(props){ 
        super(props);
        this.state = {
            eventList: [],
            authenticated: true,
            show: false,
            loading: true 
        };
    }

    componentDidMount(){
        this.getEvents().then((result) => {
            this.setState({
                eventList: result.eventList,
                authenticated: true,
                show: false,
                loading: false
            })
        }).catch((error) => {
            removeSessionCookie()
            console.log(error)  // handle any rejects that come up in the chain.
        })
    }

    setUpEventList() {
        this.rows = [];
        console.log(this.state.eventList)
        const length = this.state.eventList.length;
        for (let i = 0; i < length; i++) {
            let name;
            let location;
            let date;
            console.log(this.state.eventList[i]._id)
            name = <td className='eventListName'> <button className="eventListButton" onClick={this.goToEvent.bind(this, this.state.eventList[i]._id)}> {this.state.eventList[i].eventName} </button> </td>
            location = <td className='eventListLocation'> <button className="eventListButton" onClick={this.goToEvent.bind(this, this.state.eventList[i]._id)}> {this.state.eventList[i].location} </button> </td>
            date = <td className='eventListDate'> <button className="eventListButton" onClick={this.goToEvent.bind(this, this.state.eventList[i]._id)}> {this.formatDate(new Date(this.state.eventList[i].date))} </button> </td>
            this.rows.push(<tr className="eventListRow" key={i}>{name}{location}{date}</tr>)
        }
    }

    formatDate(date) {
        const monthNames = [
          "Jan", "Feb", "Mar",
          "Apr", "May", "Jun", "Jul",
          "Aug", "Sep", "Oct",
          "Nov", "Dec"
        ];
      
        const day = date.getDate();
        const monthIndex = date.getMonth();
        const year = date.getFullYear();
        let hour = date.getHours();
        let min = date.getMinutes();
        let am_pm = ' AM';
        if (hour > 12) {
            hour = hour - 12
            am_pm = ' PM'
        }
        if (hour < 10) {
            hour = '0' + hour
        }
        if (min < 10) {
            min = '0' + min
        }
      
        return monthNames[monthIndex] + '. ' +  day  + ', ' + year + ' ' + hour + ':' + min + am_pm;
      }

    getEvents(){
        return new Promise((resolve, reject) => {
            fetch(constants.HTTP + constants.HOST + constants.PORT + '/events/all', {
                method: "GET",
                credentials: 'include',
                headers: {
                "Access-Control-Allow-Credentials": "true",
                "Content-type": "application/json; charset=UTF-8"
                }})
                .then(res => res.json())
                .then(
                    
                (result) => {
                    resolve({
                        eventList: result
                    })
                },
                (error) => {
                    reject(error)
                }
            )
        })
    }

    saveEvent(event){
        return new Promise((resolve, reject) => {
            fetch(constants.HTTP + constants.HOST + constants.PORT + '/events/addEvent', {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(event),
                headers: {
                "Access-Control-Allow-Credentials": "true",
                "Content-type": "application/json; charset=UTF-8"
                }})
                .then(res => { res.json()})
                .then(
                    (result) => {
                        console.log("result: " + result)
                        resolve({
                            event: result
                        })
                    },
                    (error) => {
                        console.log("errror: " + error)
                        reject(error)
                    }
                )
            })
    }

    goToEvent(eventId) {
       
        window.location.href=' http://uni-uoft.herokuapp.com/event/' + eventId;
        // window.location.href='http://localhost:3000/event/' + eventId;
    }
  
    handleChange = date => {
        this.setState({
            date: date
        });
    };
         
    handleClose = () => {
        this.setState({show: false})
    }

    handleShow = () => {
        this.setState({show: true})
    }

    handleSave = () => {

		const name = document.querySelector("#event-name").value;
        let description =  document.querySelector("#event-description").value;
        const location = document.querySelector("#event-location").value;
        const host = this.host.email
        if (name === '') {
            alert("Event Name cannot be empty")
            return
        } else if (location === '') {
            alert("Event location cannot be empty")
            return
        } else if(!this.state.date){
            alert("Please choose an event date")
            return
        }
        if (description === '') {
            description = '[ No Description ]'
        }
        if (!host) {
            alert("Please log in")
            return
        }
        const event = {
            name: name,
            description: description,
            location: location,
            host: host,
            datetime: this.state.date,
            attendees: [host]
        }
        console.log(event)
        console.log(JSON.stringify(event))
        this.saveEvent(event)
        this.handleClose()
        window.location.reload()
    }

    loading = () => {
        const session = getSessionCookie()
        if (session) {
            this.host = session;
            console.log(session)
            return [<NavBar id = {this.props.id} key={"NavBar"}></NavBar>, <div className='sweet-loading'>
                <PacmanLoader
                color={'rgb(245, 150, 164)'}
                loading={this.state.loading}
                />
            </div>]
        }
        removeSessionCookie()
        return <Login></Login>
    }

    renderCondition = () => {
        const session = getSessionCookie()
        if (session) {
            this.host = session;
            console.log(session)
          return [<NavBar id = {this.props.id} key={"NavBar"}></NavBar>,<div className="eventList" key="eventList">
                <div className="container">
                    <button className='hostEventBtn' onClick={this.handleShow}> Host Event </button>
                    <Modal className='edit-modal' show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header className='create-event-header'>
                        <Modal.Title> Host Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="create-event-body">
                            <span className='create-event-text'>Event Name</span>
                            <FormGroup>
                                <FormControl
                                    className ="create-event-input"
                                    type="text"
                                    id="event-name"
                                    />
                            </FormGroup>
                            <span className= 'create-event-text' >Event Location</span>
                            <FormGroup>
                                <FormControl
                                    className ="create-event-input"
                                    type="text"
                                    id="event-location"
                                />
                            </FormGroup>
                            <span className= 'create-event-text' >Event Description</span>
                            <FormGroup>
                                <FormControl
                                    as="textarea"
                                    rows="3"
                                    className ="create-event-input"
                                    type="text"
                                    id="event-description"
                                />
                            </FormGroup>
                            <span className= 'create-event-text'>Event Date</span>
                            <FormGroup>
                                <DatePicker
                                onChange={this.handleChange}
                                selected={this.state.date}
                                id="event-date"
                                showTimeSelect
                                timeIntervals={15}
                                timeFormat="HH:mm"
                                dateFormat="MMMM d, yyyy hh:mm"
                                placeholderText="Click to select a date"
                                />
                            </FormGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className='modalBtn' onClick={this.handleClose}>
                        Close
                        </button>
                        <button className='modalBtn' onClick={this.handleSave}>
                        Save Changes
                        </button>
                    </Modal.Footer>
                    </Modal>
                    <h3> All Events: </h3>
                    <table>
                        <thead>
                            <tr className="eventListHeaderRow">
                                <th className='eventListName'>Name</th>
                                <th className='eventListLocation'>Location</th>
                                <th className='eventListDate'>Date Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.rows}
                        </tbody>
                    </table>
                </div>
            </div>]
        }
        removeSessionCookie()
        return <Login></Login>
      }

    render() {
        this.setUpEventList();
        return (this.state.loading ? this.loading() : this.renderCondition())
    }
}

export default EventList;