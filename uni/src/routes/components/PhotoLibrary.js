import React from "react";
import './ProfilePage.css'

export default class PhotoLibrary extends React.Component {
	constructor(props) {
		super(props)
		this.id = Number(this.props.id)
		// will retrieve photos from database 
		if (this.id !== 1) {
			this.pictures = [require('./images/photolib1.jpg'), require('./images/photolib2.jpg'), require('./images/photolib3.jpg'), 
			require('./images/photolib4.jpg'), require('./images/photolib5.jpg'), require('./images/photolib6.jpg')]
		} else {
			this.pictures = [require('./images/joker1.jpg'), require('./images/joker2.jpg'), require('./images/joker3.jpg'), 
			require('./images/joker4.jpg'), require('./images/joker5.jpg'), require('./images/joker6.png')]
		}
		
		console.log("This is the PhotoLibrary for " + this.id);
	}

	render() {
		return (
			<div>
				<table className='photoalbum'>
					<thead>
						<tr>
							<th id='photoalbumheader' className='photoalbum'> <h2> Album </h2> </th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td> <img className='photolibrary' src={this.pictures[0]} alt='Me 1'/> </td>
							<td> <img className='photolibrary' src={this.pictures[1]} alt='Me 2'/> </td>
							<td> <img className='photolibrary' src={this.pictures[2]} alt='Me 3'/> </td>
						</tr>
						<tr>
							<td> <img className='photolibrary' src={this.pictures[3]} alt='Me 4'/> </td>
							<td> <img className='photolibrary' src={this.pictures[4]} alt='Me 5'/> </td>
							<td> <img className='photolibrary' src={this.pictures[5]} alt='Me 6'/> </td>
						</tr>
					</tbody>
				</table>
			</div>
		);	
	}

}