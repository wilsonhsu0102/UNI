import React from 'react';
import './EventList.css'
import NavBar from '../components/navbar';
import constants from '../lib/constants'
import Login from '../pages/Login'
import { SessionContext, getSessionCookie, setSessionCookie, removeSessionCookie } from "../session";
/*
const eventList = [{'eventName': 'Free BBT', 'location': 'SS', 'date': '2019/01/01 13:00:00'}, {'eventName': 'Free Donuts', 'location': 'SS', 'date': '2019/01/04 13:00:00'}, 
{'eventName': 'Free Shirts', 'location': 'BA', 'date': '2019/01/01 13:00:00'}, {'eventName': 'Free Pants', 'location': 'SS', 'date': '2019/01/01 13:00:00'}, 
{'eventName': 'Free Textbooks', 'location': 'SS', 'date': '2019/05/07 13:00:00'}, {'eventName': 'Free Hugs', 'location': 'OISE', 'date': '2019/01/21 13:00:00'}, 
{'eventName': 'Free Alcohol (shhh', 'location': 'SS', 'date': '2019/08/01 13:00:00'}, {'eventName': 'Free Donuts', 'location': 'SS', 'date': '2019/01/01 13:00:00'}, 
{'eventName': 'FREE TUITIONNNNNNNNNNNN!!', 'location': "Meric's Office", 'date': '3999/01/01 13:00:00'}, {'eventName': 'Free Essay Writer', 'location': "UC", 'date': '3999/01/01 13:00:00'},
{'eventName': 'Some Event1', 'location': "UC", 'date': '3999/01/01 13:00:00'}, {'eventName': 'Some Event2', 'location': "UC", 'date': '3999/01/01 13:00:00'}, 
{'eventName': 'Some Event3', 'location': "UC", 'date': '3999/01/01 13:00:00'}, {'eventName': 'Some Event4', 'location': "UC", 'date': '3999/01/01 13:00:00'}]
*/

class EventList extends React.Component {
    constructor(props){ 
        super(props);
        this.state = {
            eventList: [],
            authenticated: true
        };
    }

    componentDidMount(){
        this.getEvents().then((result) => {
            this.setState({
                eventList: result.eventList,
                authenticated: true
            })
            
        }).catch((error) => {
            removeSessionCookie()
            console.log(error)  // handle any rejects that come up in the chain.
        })
    }

    getEvents(){
        return new Promise((resolve, reject) => {
            fetch(constants.HTTP + constants.HOST + constants.PORT + '/eventList/all', {
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
                    reject('issue with getting resource')
                }
            )
        })
        
    }

    goToEvent(eventId) {
        window.location.href='http://localhost:3000/event/' + eventId;
    }

    renderCondition = () => {
        const session = getSessionCookie()
        if (session) {
          return [<NavBar id = {this.props.id} key={"NavBar"}></NavBar>,<div className="eventList" key="eventList">
                <div className="container"> 
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

    setUpEventList() {
        /// Get events from server
        // code below requires server call
        this.rows = [];
        console.log(this.state.eventList)
        const length = this.state.eventList.length;
        for (let i = 0; i < length; i++) {
            let name;
            let location;
            let date;
            if (i === 0 || i === 1) {
                name = <td className='eventListName'> <button className="eventListButton" onClick={this.goToEvent.bind(this, 1 - i)}> {this.state.eventList[i].eventName} </button> </td>
                location = <td className='eventListLocation'> <button className="eventListButton" onClick={this.goToEvent.bind(this, i)}> {this.state.eventList[i].location} </button> </td>
                date = <td className='eventListDate'> <button className="eventListButton" onClick={this.goToEvent.bind(this, 1 - i)}> {this.state.eventList[i].date} </button> </td>
            } else {
                name = <td className='eventListName'> <button className="eventListButton"> {this.state.eventList[i].eventName} </button> </td>
                location = <td className='eventListLocation'> <button className="eventListButton"> {this.state.eventList[i].location} </button> </td>
                date = <td className='eventListDate'> <button className="eventListButton"> {this.state.eventList[i].date} </button> </td>
            }
            this.rows.push(<tr className="eventListRow" key={i}>{name}{location}{date}</tr>)
        }
    }
    
    render() {
        this.setUpEventList();
        return this.renderCondition()
    }
}

export default EventList;