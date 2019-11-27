import React from "react";
import './ProfilePage.css';
import constants from '../../lib/constants';

export default class HiddenInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pictures: []
		}

		// if (this.id !== 1) {
		// 	this.pictures = [require('../../images/hiddenlib1.jpg'), require('../../images/hiddenlib2.jpg'), require('../../images/hiddenlib3.jpg'),
		// 	require('../../images/hiddenlib4.jpg'), require('../../images/hiddenlib5.jpg'), require('../../images/hiddenlib6.jpg')]
		// } else {
		// 	this.pictures = [require('../../images/hiddenlib1.jpg'), require('../../images/hiddenlib2.jpg'), require('../../images/hiddenlib3.jpg'),
		// 	require('../../images/hiddenlib4.jpg'), require('../../images/hiddenlib5.jpg'), require('../../images/hiddenlib6.jpg')]
		// }
		
		// console.log("This is the PhotoLibrary for " + this.id);
	}

	componentDidMount(){
        console.log("the bio for the profile")
        this.getProfile().then((result) => {
            this.setState({
              pictures: result
            })
        }).catch((error) => {
            console.log(error)  // handle any rejects that come up in the chain.
        })
    }
    
      getProfile(){
          return new Promise((resolve, reject) => {
              fetch(constants.HTTP + constants.HOST + constants.PORT + '/student/getProfile', {
                  method: "GET",
                  credentials: 'include',
                    headers: {
                    "Access-Control-Allow-Credentials": "true",
                    "Content-type": "application/json; charset=UTF-8"
                    }})
                  .then(res => res.json())
                  .then(
                  (result) => {
                      resolve(result.pictures.hiddenlib)
                  },
                  (error) => {
                      reject('issue with getting resource')
                  }
              )
          })
          
      }	

	render() {
		var td = [];
		var td2 = [];
		let i = 1;
		this.state.pictures.forEach(function(photo) {
			if (i < 3) {
				td.push(<td> <img className='photolibrary' src={photo} alt={'Me ' + i}/> </td>);
			} else {
				td2.push(<td> <img className='photolibrary' src={photo} alt={'Me ' + i}/> </td>);
			}
			i++;
		}.bind(this));
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
							{td}
							{/* <td> <img className='hiddenlibrary' src={this.pictures[0]} alt='Hidden 1'/> </td>
							<td> <img className='hiddenlibrary' src={this.pictures[1]} alt='Hidden 2'/> </td>
							<td> <img className='hiddenlibrary' src={this.pictures[2]} alt='Hidden 3'/> </td> */}
						</tr>
						<tr>
							{td2}
							{/* <td> <img className='hiddenlibrary' src={this.pictures[3]} alt='Hidden 4'/> </td>
							<td> <img className='hiddenlibrary' src={this.pictures[4]} alt='Hidden 5'/> </td>
							<td> <img className='hiddenlibrary' src={this.pictures[5]} alt='Hidden 6'/> </td> */}
						</tr>
					</tbody>
				</table>
			</div>
		);	
	}

}