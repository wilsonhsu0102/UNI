import React from "react";
import './ProfilePage.css';
import constants from '../../lib/constants';
import axios from 'axios'; 

export default class Bio extends React.Component {
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
			<div className='userinfo'>
				<table>
					<tbody> 
						<tr className='userInfoRow'>
							<td className='biotags'>Year of Study </td><td className='bioinput'> {this.state.account.year} </td>
						</tr>
						<tr className='userInfoRow'>
							<td className='biotags'>Major </td><td className='bioinput'> {this.state.account.major} </td>
						</tr>
						<tr className='userInfoRow'>
							<td className='biotags'>Campus </td><td className='bioinput'> {this.state.account.campus} </td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}