import React from "react";
import './ProfilePage.css'
import constants from '../../lib/constants'

export default class PhotoLibrary extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pictures: []
		}
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
                      resolve(result.pictures.photolib)
                  },
                  (error) => {
                      reject('issue with getting resource')
                  }
              )
          })
          
      }	

	// 	if (this.id !== 1) {
	// 		this.pictures = [require('../../images/photolib1.jpg'), require('../../images/photolib2.jpg'), require('../../images/photolib3.jpg'), 
	// 		require('../../images/photolib4.jpg'), require('../../images/photolib5.jpg'), require('../../images/photolib6.jpg')]
	// 	} else {
	// 		this.pictures = [require('../../images/joker1.jpg'), require('../../images/joker2.jpg'), require('../../images/joker3.jpg'), 
	// 		require('../../images/joker4.jpg'), require('../../images/joker5.jpg'), require('../../images/joker6.png')]
	// 	}
		
	// 	console.log("This is the PhotoLibrary for " + this.id);
	// }

	render() {
		console.log(this.state.pictures)
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
				<table className='photoalbum'>
					<thead>
						<tr>
							<th id='photoalbumheader' className='photoalbum'> <h2> Album </h2> </th>
						</tr>
					</thead>
					<tbody>
						<tr>
							{/* <td> <img className='photolibrary' src={this.pictures[0]} alt='Me 1'/> </td>
							<td> <img className='photolibrary' src={this.pictures[1]} alt='Me 2'/> </td>
							<td> <img className='photolibrary' src={this.pictures[2]} alt='Me 3'/> </td> */}
							{td}
						</tr>
						<tr>
							{td2}
							{/* <td> <img className='photolibrary' src={this.pictures[3]} alt='Me 4'/> </td>
							<td> <img className='photolibrary' src={this.pictures[4]} alt='Me 5'/> </td>
							<td> <img className='photolibrary' src={this.pictures[5]} alt='Me 6'/> </td> */}
						</tr>
					</tbody>
				</table>
			</div>
		);	
	}

}