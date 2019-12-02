import React from "react";
import './ProfilePage.css';
import constants from '../../lib/constants';
import axios from 'axios'; 

export default class ProfilePicture extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			account: {},
		}
	}

	componentDidMount(){
        console.log("Loading profile page.")
        axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/student/getAccount/${this.props.id}`, {withCredentials: true})
		.then(res => {
			
            this.setState({
                account: res.data
            })
            console.log(res)
			console.log(this.state.account)
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
		
		})
    }	

	render() {
		console.log(this.state.account.profilePicture)
		return (
			<div>
				<img className='profilepic' src={this.state.account.profilePicture} alt='Me'/>
				<h1 className='profilename'> {this.state.account.name} </h1>
			</div>
		);	
	}

}