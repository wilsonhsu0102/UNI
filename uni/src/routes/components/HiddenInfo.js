import React from "react";
import './ProfilePage.css'

export default class HiddenInfo extends React.Component {
	constructor(props) {
		super(props)
		this.id = Number(this.props.id)
		// will retrieve photos stored in database
		if (this.id !== 1) {
			this.pictures = [require('./images/hiddenlib1.jpg'), require('./images/hiddenlib2.jpg'), require('./images/hiddenlib3.jpg'),
			require('./images/hiddenlib4.jpg'), require('./images/hiddenlib5.jpg'), require('./images/hiddenlib6.jpg')]
		} else {
			this.pictures = [require('./images/hiddenlib1.jpg'), require('./images/hiddenlib2.jpg'), require('./images/hiddenlib3.jpg'),
			require('./images/hiddenlib4.jpg'), require('./images/hiddenlib5.jpg'), require('./images/hiddenlib6.jpg')]
		}
		
		console.log("This is the PhotoLibrary for " + this.id);
	}

	render() {
		return (
			<div>
				<table className='hiddenalbum'>
					<thead>
						<tr>
							<th id='hiddenalbumheader' className='photoalbum'> <h2> Interests </h2> </th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td> <img className='hiddenlibrary' src={this.pictures[0]} alt='Hidden 1'/> </td>
							<td> <img className='hiddenlibrary' src={this.pictures[1]} alt='Hidden 2'/> </td>
							<td> <img className='hiddenlibrary' src={this.pictures[2]} alt='Hidden 3'/> </td>
						</tr>
						<tr>
							<td> <img className='hiddenlibrary' src={this.pictures[3]} alt='Hidden 4'/> </td>
							<td> <img className='hiddenlibrary' src={this.pictures[4]} alt='Hidden 5'/> </td>
							<td> <img className='hiddenlibrary' src={this.pictures[5]} alt='Hidden 6'/> </td>
						</tr>
					</tbody>
				</table>
			</div>
		);	
	}

}