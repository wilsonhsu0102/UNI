import React from "react";
import constants from '../../lib/constants'
import axios from 'axios'; 

export default class SelfIntro extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			account: this.props.account
		}
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