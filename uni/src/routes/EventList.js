import React from 'react';
import './EventList.css'

const eventList = [{'eventName': 'Free BBT', 'location': 'SS', 'date': '2019/01/01 13:00:00'}, {'eventName': 'Free Donuts', 'location': 'SS', 'date': '2019/01/04 13:00:00'}, 
{'eventName': 'Free Shirts', 'location': 'BA', 'date': '2019/01/01 13:00:00'}, {'eventName': 'Free Pants', 'location': 'SS', 'date': '2019/01/01 13:00:00'}, 
{'eventName': 'Free Textbooks', 'location': 'SS', 'date': '2019/05/07 13:00:00'}, {'eventName': 'Free Hugs', 'location': 'OISE', 'date': '2019/01/21 13:00:00'}, 
{'eventName': 'Free Alcohol (shhh', 'location': 'SS', 'date': '2019/08/01 13:00:00'}, {'eventName': 'Free Donuts', 'location': 'SS', 'date': '2019/01/01 13:00:00'}, 
{'eventName': 'FREEEEEEEEEEEEEEEEEEEEEEE TUITIONNNNNN!!', 'location': "Meric's Office", 'date': '3999/01/01 13:00:00'}, {'eventName': 'Free Essay Writer', 'location': "UC", 'date': '3999/01/01 13:00:00'},
{'eventName': 'Some Event1', 'location': "UC", 'date': '3999/01/01 13:00:00'}, {'eventName': 'Some Event2', 'location': "UC", 'date': '3999/01/01 13:00:00'}, 
{'eventName': 'Some Event3', 'location': "UC", 'date': '3999/01/01 13:00:00'}, {'eventName': 'Some Event4', 'location': "UC", 'date': '3999/01/01 13:00:00'}]

class EventList extends React.Component {
    constructor(props){
        super(props);
        this.eventList = eventList;
    }

    render() {
        const rows = [];
        const length = this.eventList.length;
        for (let i = 0; i < length; i++) {
            const name = <td className='eventListName'> <button className="eventListButton"> {this.eventList[i].eventName} </button> </td>
            const location = <td className='eventListLocation'> <button className="eventListButton"> {this.eventList[i].location} </button> </td>
            const date = <td className='eventListDate'> <button className="eventListButton"> {this.eventList[i].date} </button> </td>
            rows.push(<tr className="eventListRow" key={i}> {name} {location} {date} </tr>)
        }
        return (
            <div className="eventList">
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
                            {rows}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default EventList;