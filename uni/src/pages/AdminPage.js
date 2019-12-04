import React from 'react';
import Login from '../pages/Login'
import '../components/AdminPage.css'
import NavBar from '../components/navbar';
import PermissionDenied from '../pages/PermissionDenied'
import { SessionContext, getSessionCookie, setSessionCookie, removeSessionCookie } from "../session";
import constants from '../lib/constants'
					
class Admin extends React.Component {
    constructor(props) {
		super(props);
		
		this.state = {
			userList: [],
			userId: 0,
			numUsers: 0,
			eventId: 0,
			numEvents: 0,
			eventList: [],
			statsTable: []
		}
		
		
	}
	
	componentDidMount(){
		this.getStudents().then((result) => {
			const users = result.students
			console.log('users', users)
			let numUsers = 0;
			let userList = []
			for (let i = 0; i < users.length; i++) {
				userList.push(<tr id={users[i]._id} key={'User:' + users[i].name + 'ID:' + users[i]._id}>
									<td className = 'TableContents' style={{overflow: 'scroll'}}>{users[i].name}</td>
									<td className = 'TableButtonCell' style={{overflow: 'scroll'}}>{users[i]._id}</td>
									<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
									</tr>);	
				numUsers++
			}
			
			this.getEvents().then((events) => {
				const startEvents = events.events
				let numEvents = 0;
				let eventList = []
				for (let i = 0; i < startEvents.length; i++) {
					let cEID = startEvents[i]._id;
					eventList.push(<tr id={cEID} key={'Event:' + startEvents[i].eventName + 'EventID:' + cEID}>
										<td className = 'TableContents' style={{overflow: 'scroll'}}>{startEvents[i].eventName}</td>
										<td className = 'TableButtonCell'>{cEID}</td>
										<td className = 'TableContents' style={{overflow: 'scroll'}}>{startEvents[i].hostName}</td>
										<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.goToEvent}>To Event</button></td>
										<td className = 'TableButtonCell'><button className = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
										</tr>);
					numEvents++
				}

				this.state.statsTable.push(<tr id={'AdminStatisticTNU'} key={'AdminStatisticTNU'}>
						<td className = 'TableContents'> {'Total Number of Users'}</td>
						<td className = 'TableContents'>{ numUsers }</td></tr>);
				this.state.statsTable.push(<tr id={'AdminStatisticTNE'} key={'AdminStatisticTNE'}>
						<td className = 'TableContents'> {'Total Number of Events'}</td>
						<td className = 'TableContents'>{ numEvents }</td></tr>);

				
				this.setState({
					userList: userList,
					eventList: eventList
				})


			})
			
			
		}).catch((error) => {
			console.log(error)  // handle any rejects that come up in the chain.
		})
	}
	
	  getStudents(){
		  return new Promise((resolve, reject) => {
			  console.log(constants.HTTP + constants.HOST + constants.PORT + '/student/all')
			  fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/all', {
				  method: "GET",
				  credentials: 'include',
				  headers: {
				  "Access-Control-Allow-Credentials": "true",
				  "Content-type": "application/json; charset=UTF-8"
				  }})
				  .then(res => res.json())
				  .then(
					
				  (result) => {
					  console.log(result)
					  resolve({
						  students: result.students
					  })
				  },
				  (error) => {
					  //removeSessionCookie()
					  console.log('rejected', error)
					  reject(error + 'issue with getting resource')
				  }
			  )
		  })
		  
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
						events: result
					})
				},
				(error) => {
					//removeSessionCookie()
					reject(error + 'issue with getting resource')
				}
			)
		})
		
	}

	goToProfile(e) {
		let rowId = e.target.parentElement.parentElement.id;
		window.location.href= constants.HTTP + constants.HOST + constants.PORT + '/profile/' + rowId;
    }
	
	goToEvent(e) {
		let rowId = e.target.parentElement.parentElement.id;
		//If statement is for mock data, will be changed later
		window.location.href= constants.HTTP + constants.HOST + constants.PORT + '/event/' + rowId;
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
						</tr>);	
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
						</tr>);	
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
	renderCondition = () => {
		const session = getSessionCookie()
		console.log(session)
        if (session && session.admin) {
            this.host = session;
            console.log(session)
			return [<NavBar id={this.id}></NavBar>,<div id='AdminBody'>
			<div style={{width: '100vw', float: 'left'}}>
				<h4 id='PageHeader'>Admin Dashboard</h4>
			</div>
			<div style={{width: '100vw', float: 'left'}}>
				<h4 id='UserListHeader'>User List</h4>
			</div>
			
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
					</tr>
					{ this.state.userList }
				</tbody>
			</table>
			<div style={{width: '100vw', float: 'left'}}></div>
			<div style={{width: '100vw', float: 'left'}}>
				<h4 id='AdminEventListHeader'>Event List</h4>
			</div>
			
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
					</tr>
					{ this.state.eventList }
				</tbody>
			</table>
			<br></br>
		</div>]
        }
        removeSessionCookie()
        return <Login></Login>
      }
    render()  {
		return this.renderCondition()
    }
  }
export default Admin;