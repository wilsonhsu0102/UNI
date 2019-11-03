import React from 'react';
import './EventList.css'
import NavBar from '../components/navbar';
import PermissionDenied from '../routes/PermissionDenied'


const eventList = [{'eventName': 'Free BBT', 'location': 'SS', 'date': '2019/01/01 13:00:00'}, {'eventName': 'Free Donuts', 'location': 'SS', 'date': '2019/01/04 13:00:00'}, 
{'eventName': 'Free Shirts', 'location': 'BA', 'date': '2019/01/01 13:00:00'}, {'eventName': 'Free Pants', 'location': 'SS', 'date': '2019/01/01 13:00:00'}, 
{'eventName': 'Free Textbooks', 'location': 'SS', 'date': '2019/05/07 13:00:00'}, {'eventName': 'Free Hugs', 'location': 'OISE', 'date': '2019/01/21 13:00:00'}, 
{'eventName': 'Free Alcohol (shhh', 'location': 'SS', 'date': '2019/08/01 13:00:00'}, {'eventName': 'Free Donuts', 'location': 'SS', 'date': '2019/01/01 13:00:00'}, 
{'eventName': 'FREE TUITIONNNNNNNNNNNN!!', 'location': "Meric's Office", 'date': '3999/01/01 13:00:00'}, {'eventName': 'Free Essay Writer', 'location': "UC", 'date': '3999/01/01 13:00:00'},
{'eventName': 'Some Event1', 'location': "UC", 'date': '3999/01/01 13:00:00'}, {'eventName': 'Some Event2', 'location': "UC", 'date': '3999/01/01 13:00:00'}, 
{'eventName': 'Some Event3', 'location': "UC", 'date': '3999/01/01 13:00:00'}, {'eventName': 'Some Event4', 'location': "UC", 'date': '3999/01/01 13:00:00'}]

class EventList extends React.Component {
    constructor(props){
        super(props);
        this.eventList = eventList;
    }

    goToEvent(eventId) {
        window.location.href='http://localhost:3000/event/' + eventId;
    }

    setUpEventList() {
        /// Get events from server
        // code below requires server call
        this.rows = [];
        const length = this.eventList.length;
        for (let i = 0; i < length; i++) {
            let name;
            let location;
            let date;
            if (i === 0 || i === 1) {
                name = <td className='eventListName'> <button className="eventListButton" onClick={this.goToEvent.bind(this, 1 - i)}> {this.eventList[i].eventName} </button> </td>
                location = <td className='eventListLocation'> <button className="eventListButton" onClick={this.goToEvent.bind(this, i)}> {this.eventList[i].location} </button> </td>
                date = <td className='eventListDate'> <button className="eventListButton" onClick={this.goToEvent.bind(this, 1 - i)}> {this.eventList[i].date} </button> </td>
            } else {
                name = <td className='eventListName'> <button className="eventListButton"> {this.eventList[i].eventName} </button> </td>
                location = <td className='eventListLocation'> <button className="eventListButton"> {this.eventList[i].location} </button> </td>
                date = <td className='eventListDate'> <button className="eventListButton"> {this.eventList[i].date} </button> </td>
            }
            this.rows.push(<tr className="eventListRow" key={i}> {name} {location} {date} </tr>)
        }
    }

    renderCondition() {
        if (this.props.id == null && this.props.location == null){
            return <PermissionDenied></PermissionDenied>
        }
        if (parseInt(this.props.location.state.id) >= 0) {
            return [<NavBar id = {this.props.location.state.id}></NavBar>,<div className="eventList">
                        <div className="container"> 
                            <h3> All Events: </h3>
                            <table>
                                <thead>
                                    <tr className="eventListHeaderRow">
                                        <th className='eventListName'> Name </th>
                                        <th className='eventListLocation'> Location </th>
                                        <th className='eventListDate'> Date Time </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.rows}
                                </tbody>
                            </table>
                        </div>
                    </div>]
        } else {
            return <PermissionDenied></PermissionDenied>
        }
    }

    render() {
        this.setUpEventList();
        return (
            this.renderCondition()
        );
    }
}

export default EventList;