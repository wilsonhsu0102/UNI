import React from "react";

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
					<th id='hiddenalbumheader' class='photoalbum'> <h2> More About Me </h2> </th>
					<tr>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib1.jpg')}/> </td>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib2.jpg')}/> </td>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib3.jpg')}/> </td>
					</tr>
					<tr>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib4.jpg')}/> </td>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib5.jpg')}/> </td>
						<td> <img class='hiddenlibrary' src={require('./images/hiddenlib6.jpg')}/> </td>
					</tr>
				</table>
			</div>
		);	
	}

}