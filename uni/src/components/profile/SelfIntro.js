import React from "react";
import constants from '../../lib/constants'
import axios from 'axios'; 

export default class SelfIntro extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			account: {}
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
		return (
			<div id='selfintrodiv'>
				<h4 className='selfintro'>Self-Introduction</h4>
				<p className='selfintro'> {this.state.account.description} </p>
			</div>
		);
	}
}