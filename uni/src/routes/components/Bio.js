import React from "react";
import './ProfilePage.css'

export default class Bio extends React.Component {
	constructor(props) {
		super(props)
		this.id = Number(this.props.id)

		// will retrieve current user info and set year major and campus from retrieved data
		if (this.id !== 1) {
			this.year = 3;
			this.major = "Computer Science"
			this.campus = "St. George"
		} else {
			this.year = 5;
			this.major = "Social Science"
			this.campus = "Missisauga"	
		}
		
		console.log("This is the bio information for " + this.id);
	}

	render() {
		return (
			<div className='userinfo'>
				<table>
					<tbody> 
						<tr>
							<td className='biotags'>Year of Study </td><td className='bioinput'> {this.year} </td>
						</tr>
						<tr>
							<td className='biotags'>Major </td><td className='bioinput'> {this.major} </td>
						</tr>
						<tr>
							<td className='biotags'>Campus </td><td className='bioinput'> {this.campus} </td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}