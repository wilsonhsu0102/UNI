import React from "react";
import './ProfilePage.css'

export default class HiddenInfo extends React.Component {
	constructor(props) {
		super()
		this.id = this.props
		// will retrieve photos stored in database
		this.pictures = [require('./images/hiddenlib1.jpg'), require('./images/hiddenlib2.jpg'), require('./images/hiddenlib3.jpg'),
			require('./images/hiddenlib4.jpg'), require('./images/hiddenlib5.jpg'), require('./images/hiddenlib6.jpg')]
		console.log("This is the PhotoLibrary for " + this.id);
	}

	render() {
		return (
			<div>
				
				<table class='hiddenalbum'>
					<th id='hiddenalbumheader' class='photoalbum'> <h2> Interests </h2> </th>
					<tr>
						<td> <img class='hiddenlibrary' src={this.pictures[0]} alt='Hidden 1'/> </td>
						<td> <img class='hiddenlibrary' src={this.pictures[1]} alt='Hidden 2'/> </td>
						<td> <img class='hiddenlibrary' src={this.pictures[2]} alt='Hidden 3'/> </td>
					</tr>
					<tr>
						<td> <img class='hiddenlibrary' src={this.pictures[3]} alt='Hidden 4'/> </td>
						<td> <img class='hiddenlibrary' src={this.pictures[4]} alt='Hidden 5'/> </td>
						<td> <img class='hiddenlibrary' src={this.pictures[5]} alt='Hidden 6'/> </td>
					</tr>
				</table>
			</div>
		);	
	}

}