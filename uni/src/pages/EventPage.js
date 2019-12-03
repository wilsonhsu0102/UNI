import React from 'react';
import './EventPage.css'
import NavBar from '../components/navbar';
import constants from '../lib/constants'
import Login from '../pages/Login'
import { SessionContext, getSessionCookie, setSessionCookie, removeSessionCookie } from "../session";
import PacmanLoader from 'react-spinners/PacmanLoader';

class Event extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
        this.state = {
            authenticated: true,
            photo: '',
            profilePic: '',
            attendees: [],
            loading: true,
        }
    }

    componentDidMount() {
        this.getEventById()
        .then(event => {
            this.setState({
                eventName: event.eventName,
                description: event.description,
                location: event.location,
                datetime: this.formatDate(new Date(event.date)),
                authenticated: true,
                photo: event.coverPhoto,
            })
            this.getHostByEmail()
            .then(host => {
                console.log(host)
                this.setState({
                    hostName: host.name,
                    hostId: host._id,
                    profilePic: host.profilePicture,
                })
                this.getAttendees()
                .then(data => {
                    console.log(data)
                    this.setState({
                        attendees: data,
                        loading: false
                    })
                })
                .catch(err => {
                    removeSessionCookie()
                    console.log(err)
                })
            }).catch( err => {
                removeSessionCookie()
                console.log(err)
            })
        })
        .catch(err => {
            removeSessionCookie()
            console.log(err)
        })
        
        
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

    getHostByEmail() {
        return new Promise((resolve, reject) => {
            fetch(constants.HTTP + constants.HOST + constants.PORT + `/student/event?eventId=${this.id}`, {
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
        window.location.href= constants.HTTP + constants.HOST + constants.PORT + '/profile/' + profileId
        //window.location.href='http://uni-uoft.herokuapp.com/profile/' + profileId;
        //window.location.href='http://localhost:3000/profile/' + profileId;
    }

    setUpAttendees() {
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

    addNewAttendee() {
        const opt = {
            eventId: this.id,
            user_email: this.host.email
        }
        return new Promise((resolve, reject) => {
            fetch(constants.HTTP + constants.HOST + constants.PORT + `/events/addNewAttendee`, {
                method: "POST",
                credentials: 'include',
                headers: {
                "Access-Control-Allow-Credentials": "true",
                "Content-type": "application/json; charset=UTF-8"
                },
                body: JSON.stringify(opt)
            })
                .then(res => res.json())
                .then(
                        
                (result) => {
                    window.location.reload()
                    resolve(result)
                },
                (error) => {
                    reject(error)
                })
            })
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
            console.log(this.state.profilePic)
            return (
                [<NavBar id={this.id} key={"NavBar"}></NavBar>, <div className="eventPage" key={"eventPage" + this.id}> 
                <div className="container"> 
                    <div className="eventBlock">
                        <button className='attendanceBtn' onClick={this.addNewAttendee.bind(this)}> Going </button> 
                        <div className="name"> 
                            {this.state.eventName}
                        </div>
                        <div className="coverPhoto"> 
                            <img id="eventPic" src={`data:image/png;base64,${this.state.photo}`} alt="Cover for the event"/>
                        </div>
                        <h3> Event Description: </h3>
                        <div className="description">
                            {this.state.description}
                        </div>
    
                    </div>
                    <div className="sideBlock">
                        <div className="hostProfile">
                            <button className="profileButton" onClick={this.goToProfile.bind(this, this.state.hostId)}> 
                                <img src={`data:image/png;base64,${this.state.profilePic}`} alt="profile for host"/> 
                            </button>
                            <h3 className="hostName"> Host: {this.state.hostName} </h3>
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
        return (this.state.loading ? this.loading() : this.renderCondition())
      }
  }
export default Event;