import React from 'react';
import './components/AdminPage.css'
import { Link } from 'react-router-dom';

const users = [{"name": "Jay Chou"}, {"name": "Rich Brian"}, {"name": "Higher Brothers"}, {"name": "BTS"}, {"name": "Twice"}, {"name": "Black Pink"}, {"name": "Shawn Mendes"}, {"name": "Wilson Hsu"}]

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.id = this.props.id;
		this.users = users;
        console.log("This is the admin page for admin id" + this.id);
    }

	state = {
		adminLoggedIn: false,
		userList: [],
		userId: 0
	}
		
	adminCheck = (e) => {
		e.preventDefault();
        console.log('Check')
		let currLog = this.state.adminLoggedIn;
		const username = document.querySelector('#adminName').value;
		const password = document.querySelector('#adminPassword').value;
	    if(username === "admin" && password === "admin"){
			console.log('Successfully Logged In');
			currLog = true;
		}
		this.setState({
        	adminLoggedIn: currLog
      	});
		
	}
	
	addUser = (e) => {
		e.preventDefault();
		let currUsers = this.state.userList;
		const userFullName = document.querySelector('#newUser').value;
	    if(this.state.adminLoggedIn == true){
            console.log('adding user');
			currUsers.push(<tr key={userFullName}><td>{userFullName}</td><td>{this.state.userId++}</td></tr>);
			console.log(currUsers);
		}
		else{
			console.log('Not logged in as an Admin')
		}
		this.setState({
        	userList: currUsers
      	});
		console.log(this.state.userList);
	}

    render()  {
		for (const [index, value] of this.users.entries()) {
			this.state.userList.push(<tr key={value.name}><td>{value.name}</td><td>{this.state.userId++}</td></tr>);	
		}
        return (
            <div id='body'>
                <h1>This is the Admin page for admin id {this.id} </h1>
                <form id='AdminLogin'>
                    <input id='adminName' type="text" placeholder="Username"/>
                    <input id='adminPassword' type="text" placeholder="Password"/>
                    <button onClick={ this.adminCheck }>Login</button>
                </form>
				 
                <form id='UserForm'>
                    <input id='newUser' type="text" placeholder="Full Name"/>
                    <button onClick={ this.addUser }>Add User</button>
                </form>
				<table id='UserList'>
 		            <tbody>
	 		           <tr>
	 			           <th>
	 				           Name
	 			           </th>
						   <th>
	 				            UserID
	 			           </th>
	 		           </tr>
					   { this.state.userList }
 		             </tbody>
 	             </table>
			 </div>
          );
      }
  }
export default Admin;