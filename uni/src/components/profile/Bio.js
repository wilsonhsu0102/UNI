import React from "react";
import './ProfilePage.css'
import constants from '../../lib/constants'

export default class Bio extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			profile: {}
		}
	}

	componentDidMount(){
        console.log("the bio for the profile")
        this.getProfile().then((result) => {
            this.setState({
              profile: result
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
                      resolve(result)
                  },
                  (error) => {
                      reject('issue with getting resource')
                  }
              )
          })
          
      }

	render() {
		return (
			<div className='userinfo'>
				<table>
					<tbody> 
						<tr className='userInfoRow'>
							<td className='biotags'>Year of Study </td><td className='bioinput'> {this.state.profile.year} </td>
						</tr>
						<tr className='userInfoRow'>
							<td className='biotags'>Major </td><td className='bioinput'> {this.state.profile.major} </td>
						</tr>
						<tr className='userInfoRow'>
							<td className='biotags'>Campus </td><td className='bioinput'> {this.state.profile.campus} </td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}