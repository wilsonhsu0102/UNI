import React from 'react';
import '../components/AdminPage.css'
import NavBar from '../components/navbar';
import PermissionDenied from '../pages/PermissionDenied'
import { SessionContext, getSessionCookie, setSessionCookie } from "../session";


const mockUsers = [{'name': 'Wilson Hsu'}, {'name': 'Twice'}, {'name': 'Higher Brothers'}, {'name': 'BTS'},
				   {'name': 'Rich Brian'}, {'name': 'Blackpink'}, {'name': 'Shawn Mendes'}, {'name': 'Jay Chou'},
				   {'name': 'Victor Huang'}, {'name': 'Got7'}, {'name': 'Day6'}, {'name': 'Itzy'} ]
const mockEvents = [{'eventName': 'Free BBT', 'hostName': 'Wilson Hsu' }, {'eventName': 'Once Fanmeet', 'hostName': 'Twice' }, 
					{'eventName': 'IGOT7 Fanmeet', 'hostName': 'Got7' }, {'eventName': 'Free Pants', 'hostName': 'Rich Brian' }]
					
class Admin extends React.Component {
    constructor(props) {
        super(props);
		this.id = this.props.id;
		if (this.id == null){
			this.id = this.props.location.state.id
		}
		this.users = mockUsers;
		this.startEvents = mockEvents;
		//Fills in mock data
		let emptyUserList = [];
		let id = 0;
		for (let i = 0; i < this.users.length; i++) {
			emptyUserList.push(<tr id={'User:' + this.users[i].name + 'ID:' + id} key={'User:' + this.users[i].name + 'ID:' + id}>
								<td className = 'TableContents'>{this.users[i].name}</td>
								<td className = 'TableButtonCell'>{id++}</td>
								<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
								<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.removeUser}>X</button></td></tr>);	
		}
		let emptyEventList = [];
		let cEID = 0;
		for (let i = 0; i < this.startEvents.length; i++) {
			emptyEventList.push(<tr id={'Event:' + this.startEvents[i].eventName + 'EventID:' + cEID} key={'Event:' + this.startEvents[i].eventName + 'EventID:' + cEID}>
								<td className = 'TableContents'>{this.startEvents[i].eventName}</td>
								<td className = 'TableButtonCell'>{cEID++}</td>
								<td className = 'TableContents'>{this.startEvents[i].hostName}</td>
								<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.goToEvent}>To Event</button></td>
								<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
								<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.removeEvent}>X</button></td></tr>);
		}
		this.state = {
			userList: emptyUserList,
			userId: id,
			numUsers: id,
			eventId: cEID,
			numEvents: cEID,
			eventList: emptyEventList,
			statsTable: []
		}
		this.state.statsTable.push(<tr id={'AdminStatisticTNU'} key={'AdminStatisticTNU'}>
						<td className = 'TableContents'> {'Total Number of Users'}</td>
						<td className = 'TableContents'>{ this.state.numUsers }</td></tr>);
		this.state.statsTable.push(<tr id={'AdminStatisticTNE'} key={'AdminStatisticTNE'}>
						<td className = 'TableContents'> {'Total Number of Events'}</td>
						<td className = 'TableContents'>{ this.state.numEvents }</td></tr>);
		
        console.log('Admin ID: ' + this.id);
    }

	goToProfile(e) {
		let rowId = e.target.parentElement.parentElement.id;
		//If statement is for mock data, will be changed later
		if(rowId === 'User:Wilson HsuID:0' || rowId === 'Event:Free BBTEventID:0'){
			window.location.href='http://localhost:3000/profile/0';
		}
    }
	
	goToEvent(e) {
		let rowId = e.target.parentElement.parentElement.id;
		//If statement is for mock data, will be changed later
		if(rowId === 'Event:Free BBTEventID:0'){
			window.location.href='http://localhost:3000/event/0';
		}
    }
	
	addUser = (e) => {
		e.preventDefault();
		let currUsers = [...this.state.userList];
		let currId = this.state.userId;
		let currNumUsers = this.state.numUsers;
		let currStatsTable = [...this.state.statsTable];
		const userFullName = document.querySelector('#newUser').value;
        console.log('adding user');
		currUsers.push(<tr id={'User:' + userFullName + 'ID:' + currId} key={'User:' + userFullName + 'ID:' + currId}>
						<td className = 'TableContents'>{userFullName}</td>
						<td className = 'TableButtonCell'>{currId}</td>
						<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
						<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.removeUser}>X</button></td></tr>);	
		currId++;
		currNumUsers++;
			currStatsTable = this.updateTable([...this.state.statsTable], 'AdminStatisticTNU', 'Total Number of Users', currNumUsers);
		this.setState({
        	userList: currUsers,
			userId: currId,
			numUsers: currNumUsers,
			statsTable: currStatsTable
      	});
	}
	
	removeUser = (e) => {
		let rowId = e.target.parentElement.parentElement.id;
		e.preventDefault();
		let currUsers = [...this.state.userList];
		let currNumUsers = this.state.numUsers;
		let currStatsTable = [...this.state.statsTable];
           for (let i = 0; i < currUsers.length; i++){
			if (currUsers[i].key === rowId){
				console.log('Deleting User');
				currUsers.splice(i,1);
				currNumUsers--;
				currStatsTable = this.updateTable([...this.state.statsTable], 'AdminStatisticTNU', 'Total Number of Users', currNumUsers);
			}
		}
		this.setState({
        	userList: currUsers,
			numUsers: currNumUsers,
			statsTable: currStatsTable
      	});
	}
	
	addEvent = (e) => {
		e.preventDefault();
		let currEvents = [...this.state.eventList];
		let currId = this.state.eventId;
		let currNumEvents = this.state.numEvents;
		let currStatsTable = [...this.state.statsTable];
		const newEventName = document.querySelector('#newEventName').value;
		let newHostName = document.querySelector('#newHostName').value;
		if (newHostName === ''){
			newHostName = 'Admin' + this.id;
		}
        console.log('adding event');
		currEvents.push(<tr id={'Event:' + newEventName + 'EventID:' + currId} key={'Event:' + newEventName + 'EventID:' + currId}>
						<td className = 'TableContents'>{newEventName}</td>
						<td className = 'TableButtonCell'>{currId}</td>
						<td className = 'TableContents'>{newHostName}</td>
						<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.goToEvent}>To Event</button></td>
						<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
						<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.removeEvent}>X</button></td></tr>);	
		currId++;
		currNumEvents++;
		currStatsTable = this.updateTable([...this.state.statsTable], 'AdminStatisticTNE', 'Total Number of Events', currNumEvents);
		this.setState({
        	eventList: currEvents,
			eventId: currId,
			numEvents: currNumEvents,
			statsTable: currStatsTable
      	});
	}
	
	removeEvent = (e) => {
		e.preventDefault();
		let rowId = e.target.parentElement.parentElement.id;
		let currNumEvents = this.state.numEvents;
		let currEvents = [...this.state.eventList];
		let currStatsTable = [...this.state.statsTable];
        for (let i = 0; i < currEvents.length; i++){
			if (currEvents[i].key === rowId){
				console.log('Deleting Event');
				currEvents.splice(i,1);
				currNumEvents--;
				currStatsTable = this.updateTable([...this.state.statsTable], 'AdminStatisticTNE', 'Total Number of Events', currNumEvents);
			}
		}
		this.setState({
        	eventList: currEvents,
			numEvents: currNumEvents,
			statsTable: currStatsTable
      	});
	}

	updateTable = (statTable, statKey, statName, newValue) =>{
		for(let i = 0; i < statTable.length; i++){
			if(statTable[i].key === statKey){
				statTable.splice(i, 1, <tr id={statKey} key={statKey}>
									   <td className = 'TableContents'> {statName}</td>
									   <td className = 'TableContents'>{ newValue }</td></tr>);
			}
		}
		return statTable;
	}

	renderCondition() {
		console.log("render condition connections", this.props)
		const session = getSessionCookie()
		if (session) {
			return [<NavBar id={this.id}></NavBar>,<div id='AdminBody'>
			<h4 id='PageHeader'>Admin Dashboard - Your ID: <span id='AdminId'><strong>{this.id}</strong></span></h4>
			<h4 id='UserListHeader'>User List</h4>
			<h4 id='AdminEventListHeader'>Event List</h4>
			<br></br>
			<form id='UserForm'>
				<input id='newUser' type='text' placeholder='Full Name'/>
				<button className='TableButton' onClick={ this.addUser }>Add User</button>
			</form>
			<form id='EventAddForm'>
				<input id='newEventName' type='text' placeholder='Event Name'/>
				<input id='newHostName' type='text' placeholder='Host Name'/>
				<button className='TableButton' onClick={ this.addEvent }>Add Event</button>
			</form>
			<br></br>
			<table id='UserList'>
				<tbody>
					<tr>
						<th className = 'TableContents'>
							Name
						</th>
						<th className = 'TableButtonCell'>
							UserID
						</th>
						<th className = 'TableButtonCell'>
							Profile Link
						</th>
						<th className = 'TableButtonCell'>
							Remove
						</th>
					</tr>
					{ this.state.userList }
				</tbody>
			</table>
			<table id='AdminEventList'>
				<tbody>
					<tr>
						<th className = 'TableContents'>
							Event Name
						</th>
						<th className = 'TableButtonCell'>
							EventID
						</th>
						<th className = 'TableContents'>
							Host Name
						</th>
						<th className = 'TableButtonCell'>
							Event Link
						</th>
						<th className = 'TableButtonCell'>
							Profile Link
						</th>
						<th className = 'TableButtonCell'>
							Remove
						</th>
					</tr>
					{ this.state.eventList }
				</tbody>
			</table>
			<br></br>
			<h4 id='OverallStatsHeader'>Overall Stats</h4>
			<br></br>
			<table id='OverallStatsTable'>
				<tbody>
					<tr>
						<th className = 'TableContents'>
							Statistic Name
						</th>
						<th className = 'TableContents'>
							Statistic
						</th>
					</tr>
					{this.state.statsTable}
				</tbody>
			</table>
		</div>]
		} else {
			return <PermissionDenied></PermissionDenied>
		}
	}
	
    render()  {
		return (
			this.renderCondition()
		);
    }
  }
export default Admin;