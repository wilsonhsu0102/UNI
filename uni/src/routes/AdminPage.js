import React from 'react';
import './components/AdminPage.css'
import { Link } from 'react-router-dom';

const users = [{"name": "Wilson Hsu"}, {"name": "Twice"}, {"name": "Higher Brothers"}, {"name": "BTS"}, {"name": "Rich Brian"}, {"name": "Black Pink"}, {"name": "Shawn Mendes"}, {"name": "Jay Chou"}, {"name": "Victor Huang"}, {"name": "Got7"}, {"name": "Day6"}, {"name": "Itzy"} ]

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
		this.users = users;
		//Fills in mock data
		let emptyUserList = [];
		let id = 0;
		for (const [index, value] of users.entries()) {
			emptyUserList.push(<tr id={"User:" + value.name + "ID:" + id} key={"User:" + value.name + "ID:" + id}>
								<td class = 'TableContents'>{value.name}</td>
								<td class = 'TableContents'>{id++}</td>
								<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
								<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.removeUser}>X</button></td></tr>);	
		}
		this.state = {
			adminLoggedIn: true,
			userList: emptyUserList,
			userId: id
		}
        console.log("Admin ID: " + this.id);
    }
	
	goToProfile(e) {
		let rowId = e.target.parentElement.parentElement.id;
		if(rowId === "User:Wilson HsuID:0"){
			window.location.href='http://localhost:3000/profile/0';
		}
    }
	
	addUser = (e) => {
		e.preventDefault();
		let currUsers = [...this.state.userList];
		let currId = this.state.userId;
		const userFullName = document.querySelector('#newUser').value;
	    if(this.state.adminLoggedIn == true){
            console.log('adding user');
			currUsers.push(<tr id={"User:" + userFullName + "ID:" + currId} key={"User:" + userFullName + "ID:" + currId}>
							<td>{userFullName}</td>
							<td>{currId}</td>
							<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.goToProfile}>To Profile</button></td>
							<td class = 'TableButtonCell'><button class = 'TableButton' onClick = {this.removeUser}>X</button></td></tr>);	
			currId++;
		}
		else{
			console.log('Not logged in as an Admin')
		}
		this.setState({
        	userList: currUsers,
			userId: currId
      	});
	}
	
	removeUser = (e) => {
		let rowId = e.target.parentElement.parentElement.id;
		e.preventDefault();
		let currUsers = [...this.state.userList];
	    if(this.state.adminLoggedIn == true){
            for (let i = 0; i < currUsers.length; i++){
				if (currUsers[i].key === rowId){
					console.log("Deleting User");
					currUsers.splice(i,1);
				}
			}
		}
		else{
			console.log('Not logged in as an Admin')
		}
		this.setState({
        	userList: currUsers
      	});
	}

    render()  {
		if(this.adminLoggedIn == false){
			return (
            <div id='AdminDenied'>
				<h1> PERMISSION DENIED</h1>
			 </div>
          );
		}
		else{
			return (
				<div id='AdminBody'>
					<h1>Admin ID: {this.id}</h1>
					<form id='UserForm'>
						<input id='newUser' type="text" placeholder="Full Name"/>
						<button onClick={ this.addUser }>Add User</button>
					</form>
					<div id = 'UserTableDiv'>
						<table id='UserList'>
							<tbody>
								<tr>
									<th class = 'TableContents'>
										Name
									</th>
									<th class = 'TableContents'>
										UserID
									</th>
									<th class = 'TableButton'>
										Profile
									</th>
									<th class = 'TableButton'>
										Remove
									</th>
								</tr>
								{ this.state.userList }
							</tbody>
						</table>
					</div>
				</div>
			);
		}
    }
  }
export default Admin;