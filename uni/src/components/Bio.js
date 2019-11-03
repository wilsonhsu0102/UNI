import React from "react";
import './ProfilePage.css'

export default class Bio extends React.Component {
	constructor(props) {
		super()
		this.id = this.props

		// will retrieve current user info and set year major and campus from retrieved data
		this.year = 3;
		this.major = "Computer Science"
		this.campus = "St. George"
		console.log("This is the bio information for " + this.id);
	}

	render() {
		return (
			<div class='userinfo'>
				<table>
					<tr>
						<td class='biotags'>Year of Study </td><td class='bioinput'> {this.year} </td>
					</tr>
					<tr>
						<td class='biotags'>Major </td><td class='bioinput'> {this.major} </td>
					</tr>
					<tr>
						<td class='biotags'>Campus </td><td class='bioinput'> {this.campus} </td>
					</tr>
				</table>
			</div>
		);
	}
}