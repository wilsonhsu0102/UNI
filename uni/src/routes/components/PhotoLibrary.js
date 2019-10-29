import React from "react";
import './ProfilePage.css'

export default class PhotoLibrary extends React.Component {
	constructor(props) {
		super()
		this.id = this.props
		// will retrieve photos from database 
		this.pictures = [require('./images/photolib1.jpg'), require('./images/photolib2.jpg'), require('./images/photolib3.jpg'), 
			require('./images/photolib4.jpg'), require('./images/photolib5.jpg'), require('./images/photolib6.jpg')]
		console.log("This is the PhotoLibrary for " + this.id);
	}

	render() {
		return (
			<div>
				
				<table class='photoalbum'>
					<th id='photoalbumheader' class='photoalbum'> <h2> Album </h2> </th>
					<tr>
						<td> <img class='photolibrary' src={this.pictures[0]} alt='Me 1'/> </td>
						<td> <img class='photolibrary' src={this.pictures[1]} alt='Me 2'/> </td>
						<td> <img class='photolibrary' src={this.pictures[2]} alt='Me 3'/> </td>
					</tr>
					<tr>
						<td> <img class='photolibrary' src={this.pictures[3]} alt='Me 4'/> </td>
						<td> <img class='photolibrary' src={this.pictures[4]} alt='Me 5'/> </td>
						<td> <img class='photolibrary' src={this.pictures[5]} alt='Me 6'/> </td>
					</tr>
				</table>
			</div>
		);	
	}

}