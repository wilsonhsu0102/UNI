import React from 'react';
import './EventList.css'
import NavBar from '../components/navbar';
import constants from '../lib/constants'
import Login from '../pages/Login'
import {Modal} from "react-bootstrap"
import {FormGroup, FormControl} from "react-bootstrap";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import Button from '@material-ui/core/Button';
import { SessionContext, getSessionCookie, setSessionCookie, removeSessionCookie } from "../session";
import PacmanLoader from 'react-spinners/PacmanLoader';
import ImageUploader from 'react-images-upload';
import axios from 'axios';

class EventList extends React.Component {
    constructor(props){ 
        super(props);
        this.state = {
            eventList: [],
            authenticated: true,
            show: false,
            loading: true,
            photo: ''
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
                .then(res => { 
                    res.json().then( data => {
                        console.log("result: " + data)
                        resolve({
                            event: data
                        })
                        window.location.reload()
                    }).catch( err => {
                        console.error(err)
                    })
                }).catch( err => {
                    console.error(err)
                })
            })
    }

    goToEvent(eventId) {
        window.location.href= constants.HTTP + constants.HOST + constants.PORT + '/event/' + eventId
        //window.location.href=' http://uni-uoft.herokuapp.com/event/' + eventId;
        // window.location.href='http://localhost:3000/event/' + eventId;
    }

    uploadImage(e) {
        if (window.confirm('Use this as cover photo?')) {
            let imageFormObj = new FormData();
            let time = Date.now()
            imageFormObj.append("email", this.host.email);
            imageFormObj.append("type", "event");
            imageFormObj.append("id", time)
            imageFormObj.append("imageName", "multer-image-" + time);
            imageFormObj.append("imageData", e[0]);
            imageFormObj.append("image", e[0].path);
            axios.post(`${constants.HTTP}${constants.HOST}${constants.PORT}/images/all`, imageFormObj)
                .then((data) => {
                    if (data.data.sucesss) {
                        alert("Image has been successfully uploaded")
                    }
                    console.log(data.data)
                    this.setState({
                        photo: data.data.path
                    })
                })
                .catch((err) => {
                    alert("Error while uploading image");
                    console.error(err)
                })
        }
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
        let photo = this.state.photo 
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
        console.log('-------THIS IS SENT OUT---------')
        console.log(this.state.photo)
        const event = {
            name: name,
            description: description,
            location: location,
            host: host,
            datetime: this.state.date,
            attendees: [host],
            coverPhoto: photo
        }
        this.saveEvent(event)
        this.handleClose()
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
            const upload_button_style = {
                width: '140px',
                backgroundColor: 'rgb(248, 213, 218)',
                border: '0',
                padding: '7px 0 9px 0',
                borderRadius: '5px',
                color: 'black'
              }
              const file_container_style = {
                padding: '0',
                margin: '0',
                width: '140px',
                height: '37px'
              }
          return [<NavBar id = {this.props.id} key={"NavBar"}></NavBar>,<div className="eventList" key="eventList">
                <div className="container">
                    <button className='hostEventBtn' onClick={this.handleShow}> Host Event </button>
                    <Modal className='edit-modal' show={this.state.show} onHide={this.handleClose} >
                    <Modal.Header className='create-event-header'>
                        <Modal.Title> Host Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="create-event-body">
                            <span className='create-event-text'>Event Name* </span>
                            <FormGroup>
                                <FormControl
                                    className ="create-event-input"
                                    type="text"
                                    id="event-name"
                                    />
                            </FormGroup>
                            <span className= 'create-event-text' >Event Location* </span>
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
                            <div className='event-info'> 
                                <div className='eventDate'>
                                    <span className= 'create-event-text'>Event Date* </span>
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
                                </div>
                                <div className='uploadPic'> 
                                    <span className= 'create-event-text'> Upload Cover Photo </span>
                                    <FormGroup>
                                        <ImageUploader
                                            className='upload-button'
                                            name='Profile Picture'
                                            withIcon={false}
                                            withPreview={false}
                                            withLabel={false}
                                            buttonText='Choose Images'
                                            fileContainerStyle={file_container_style}
                                            buttonStyles={upload_button_style}
                                            onChange={(e) => this.uploadImage(e)}
                                            imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                            maxFileSize={5242880}
                                        />
                                    </FormGroup>
                                </div>
                            </div>
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