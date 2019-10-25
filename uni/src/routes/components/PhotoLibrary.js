import React from "react";

export default class PhotoLibrary extends React.Component {
	constructor(props) {
		super()
		this.id = this.props
		console.log("This is the PhotoLibrary for " + this.id);
	}

	render() {
		return (
			<div>
				
				<table class='photoalbum'>
					<th id='photoalbumheader' class='photoalbum'> <h2> Album </h2> </th>
					<tr>
						<td> <img class='photolibrary' src={require('./images/photolib1.jpg')}/> </td>
						<td> <img class='photolibrary' src={require('./images/photolib2.jpg')}/> </td>
						<td> <img class='photolibrary' src={require('./images/photolib3.jpg')}/> </td>
					</tr>
					<tr>
						<td> <img class='photolibrary' src={require('./images/photolib4.jpg')}/> </td>
						<td> <img class='photolibrary' src={require('./images/photolib5.jpg')}/> </td>
						<td> <img class='photolibrary' src={require('./images/photolib6.jpg')}/> </td>
					</tr>
				</table>
			</div>
		);	
	}

}