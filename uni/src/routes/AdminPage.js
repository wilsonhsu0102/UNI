import React from 'react';
import '../components/AdminPage.css'
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import PermissionDenied from '../routes/PermissionDenied'


const mockUsers = [{'name': 'Wilson Hsu'}, {'name': 'Twice'}, {'name': 'Higher Brothers'}, {'name': 'BTS'},
				   {'name': 'Rich Brian'}, {'name': 'Blackpink'}, {'name': 'Shawn Mendes'}, {'name': 'Jay Chou'},
				   {'name': 'Victor Huang'}, {'name': 'Got7'}, {'name': 'Day6'}, {'name': 'Itzy'} ]
const mockEvents = [{'eventName': 'Free BBT', 'hostName': 'Wilson Hsu' }, {'eventName': 'Once Fanmeet', 'hostName': 'Twice' }, 
					{'eventName': 'IGOT7 Fanmeet', 'hostName': 'Got7' }, {'eventName': 'Free Pants', 'hostName': 'Rich Brian' }]
					
class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
		this.users = mockUsers;
		this.startEvents = mockEvents;
		//Fills in mock data
		let emptyUserList = [];
		let id = 0;
		for (const [index, value] of this.users.entries()) {
			emptyUserList.push(<tr id={'User:' + value.name + 'ID:' + id} key={'User:' + value.name + 'ID:' + id}>
								<td class = 'TableContents'>{value.name}</td>
								<td class = 'TableButtonCell'>{id++}</td>
								<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
								<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.removeUser}>X</button></td></tr>);	
		}
		let emptyEventList = [];
		let cEID = 0;
		for (let i = 0; i < this.startEvents.length; i++) {
			emptyEventList.push(<tr id={'Event:' + this.startEvents[i].eventName + 'EventID:' + cEID} key={'Event:' + this.startEvents[i].eventName + 'EventID:' + cEID}>
								<td class = 'TableContents'>{this.startEvents[i].eventName}</td>
								<td class = 'TableButtonCell'>{cEID++}</td>
								<td class = 'TableContents'>{this.startEvents[i].hostName}</td>
								<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.goToEvent}>To Event</button></td>
								<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
								<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.removeEvent}>X</button></td></tr>);
		}
		this.state = {
			adminLoggedIn: true,
			userList: emptyUserList,
			userId: id,
			numUsers: id,
			eventId: cEID,
			numEvents: cEID,
			eventList: emptyEventList,
			statsTable: []
		}
		let beginStats = [];
		this.state.statsTable.push(<tr id={'AdminStatisticTNU'} key={'AdminStatisticTNU'}>
						<td class = 'TableContents'> {'Total Number of Users'}</td>
						<td class = 'TableContents'>{ this.state.numUsers }</td></tr>);
		this.state.statsTable.push(<tr id={'AdminStatisticTNE'} key={'AdminStatisticTNE'}>
						<td class = 'TableContents'> {'Total Number of Events'}</td>
						<td class = 'TableContents'>{ this.state.numEvents }</td></tr>);
		
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
	    if(this.state.adminLoggedIn == true){
            console.log('adding user');
			currUsers.push(<tr id={'User:' + userFullName + 'ID:' + currId} key={'User:' + userFullName + 'ID:' + currId}>
							<td class = 'TableContents'>{userFullName}</td>
							<td class = 'TableButtonCell'>{currId}</td>
							<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
							<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.removeUser}>X</button></td></tr>);	
			currId++;
			currNumUsers++;
			currStatsTable = this.updateTable([...this.state.statsTable], 'AdminStatisticTNU', 'Total Number of Users', currNumUsers);
		}
		else{
			console.log('Not logged in as an Admin')
		}
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
	    if(this.state.adminLoggedIn == true){
            for (let i = 0; i < currUsers.length; i++){
				if (currUsers[i].key === rowId){
					console.log('Deleting User');
					currUsers.splice(i,1);
					currNumUsers--;
					currStatsTable = this.updateTable([...this.state.statsTable], 'AdminStatisticTNU', 'Total Number of Users', currNumUsers);
				}
			}
		}
		else{
			console.log('Not logged in as an Admin')
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
		console.log(newHostName);
		if (newHostName === ''){
			newHostName = 'Admin' + this.id;
		}
	    if(this.state.adminLoggedIn == true){
            console.log('adding event');
			currEvents.push(<tr id={'Event:' + newEventName + 'EventID:' + currId} key={'Event:' + newEventName + 'EventID:' + currId}>
							<td class = 'TableContents'>{newEventName}</td>
							<td class = 'TableButtonCell'>{currId}</td>
							<td class = 'TableContents'>{newHostName}</td>
							<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.goToEvent}>To Event</button></td>
							<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
							<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.removeEvent}>X</button></td></tr>);	
			currId++;
			currNumEvents++;
			currStatsTable = this.updateTable([...this.state.statsTable], 'AdminStatisticTNE', 'Total Number of Events', currNumEvents);
		}
		else{
			console.log('Not logged in as an Admin')
		}
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
	    if(this.state.adminLoggedIn == true){
            for (let i = 0; i < currEvents.length; i++){
				if (currEvents[i].key === rowId){
					console.log('Deleting Event');
					currEvents.splice(i,1);
					currNumEvents--;
					currStatsTable = this.updateTable([...this.state.statsTable], 'AdminStatisticTNE', 'Total Number of Events', currNumEvents);
				}
			}
		}
		else{
			console.log('Not logged in as an Admin')
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
									   <td class = 'TableContents'> {statName}</td>
									   <td class = 'TableContents'>{ newValue }</td></tr>);
			}
		}
		return statTable;
	}

	renderCondition() {
		console.log("render condition connections", this.props)
		if (parseInt(this.id) == 0) {
			return [<NavBar id={this.props.id}></NavBar>,<div id='AdminBody'>
			<h4 id='PageHeader'>Admin Dashboard - Your ID: <span id='AdminId'><strong>{this.id}</strong></span></h4>
			<h4 id='UserListHeader'>User List</h4>
			<h4 id='AdminEventListHeader'>Event List</h4>
			<br></br>
			<form id='UserForm'>
				<input id='newUser' type='text' placeholder='Full Name'/>
				<button class='TableButton' onClick={ this.addUser }>Add User</button>
			</form>
			<form id='EventAddForm'>
				<input id='newEventName' type='text' placeholder='Event Name'/>
				<input id='newHostName' type='text' placeholder='Host Name'/>
				<button class='TableButton' onClick={ this.addEvent }>Add Event</button>
			</form>
			<br></br>
			<table id='UserList'>
				<tbody>
					<tr>
						<th class = 'TableContents'>
							Name
						</th>
						<th class = 'TableButtonCell'>
							UserID
						</th>
						<th class = 'TableButtonCell'>
							Profile Link
						</th>
						<th class = 'TableButtonCell'>
							Remove
						</th>
					</tr>
					{ this.state.userList }
				</tbody>
			</table>
			<table id='AdminEventList'>
				<tbody>
					<tr>
						<th class = 'TableContents'>
							Event Name
						</th>
						<th class = 'TableButtonCell'>
							EventID
						</th>
						<th class = 'TableContents'>
							Host Name
						</th>
						<th class = 'TableButtonCell'>
							Event Link
						</th>
						<th class = 'TableButtonCell'>
							Profile Link
						</th>
						<th class = 'TableButtonCell'>
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
						<th class = 'TableContents'>
							Statistic Name
						</th>
						<th class = 'TableContents'>
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