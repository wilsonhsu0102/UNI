import React from "react";
import constants from '../../lib/constants'

export default class SelfIntro extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			profile: {}
		}
	}

	componentDidMount(){
        this.getProfile().then((result) => {
            this.setState({
              profile: result,
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
			<div id='selfintrodiv'>
				<h4 className='selfintro'>Self-Introduction</h4>
				<p className='selfintro'> {this.state.profile.description} </p>
			</div>
		);
	}
}