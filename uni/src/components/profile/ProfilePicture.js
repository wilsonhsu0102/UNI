import React from "react";
import './ProfilePage.css';
import constants from '../../lib/constants';
import axios from 'axios'; 

export default class ProfilePicture extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			account: {},
			pictures: []
		}
	}

	componentDidMount(){
        console.log("Loading profile picture for profile.")
		axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/images/all`, {withCredentials: true})
        .then(res => {
			let filtered = []
			console.log(res.data)
			res.data.forEach((pic) => {
				if (pic.type === 'profilepic') {
					filtered.push({img: pic.path, title: "", author: "", cols: 1})
				}
			})
			console.log(filtered)
            this.setState({
                pictures: filtered
            })
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
		})
		axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/student/getAccount`, {withCredentials: true})
		.then(res => {
			
            this.setState({
                account: res.data
			})
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