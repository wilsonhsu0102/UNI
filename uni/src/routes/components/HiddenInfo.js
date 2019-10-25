import React from "react";
import './ProfilePage.css'

export default class HiddenInfo extends React.Component {
	constructor(props) {
		super()
		this.id = this.props
		console.log("This is the PhotoLibrary for " + this.id);
	}

	render() {
		return (
			<div>
				
				<table class='hiddenalbum'>
					<th id='hiddenalbumheader' class='photoalbum'> <h2> Interests </h2> </th>
					<tr>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib1.jpg')} alt='Hidden 1'/> </td>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib2.jpg')} alt='Hidden 2'/> </td>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib3.jpg')} alt='Hidden 3'/> </td>
					</tr>
					<tr>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib4.jpg')} alt='Hidden 4'/> </td>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib5.jpg')} alt='Hidden 5'/> </td>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib6.jpg')} alt='Hidden 6'/> </td>
					</tr>
				</table>
			</div>
		);	
	}

}