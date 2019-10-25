import React from "react";

export default class Bio extends React.Component {
	constructor(props) {
		super()
		this.id = this.props
		console.log("This is the bio information for " + this.id);
	}


	render() {
		const year = 3;
		const major = "Computer Science"
		const campus = "St. George"
		return (
			<div class='userinfo'>
				<table>
					<tr>
						<td class='biotags'>Year of Study </td><td class='bioinput'> {year} </td>
					</tr>
					<tr>
						<td class='biotags'>Major </td><td class='bioinput'> {major} </td>
					</tr>
					<tr>
						<td class='biotags'>Campus </td><td class='bioinput'> {campus} </td>
					</tr>
				</table>
			</div>
		);
	}
}