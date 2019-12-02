import React from "react";
import './ProfilePage.css';
import constants from '../../lib/constants';
import axios from 'axios'; 
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

export default class HiddenInfo extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			profile: {},
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
		axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/images/all`, {withCredentials: true})
        .then(res => {
			let filtered = []
			console.log(res.data)
			res.data.forEach((pic) => {
				if (pic.type === 'hiddenlib') {
					filtered.push({img: pic.path, title: "", author: "", cols: 1})
				}
			})
			console.log(filtered)
            this.setState({
                pictures: filtered
            })
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
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
		const bgcolor = makeStyles(theme => {
			return theme.palette.background.paper;
		})
		return (
			<div className="hiddengridlistdiv" style={{backgroundColor: bgcolor}}>
				<h2> Interests </h2>
				<GridList cellHeight={160} className="hiddengridlist" cols={2}>
					{this.state.pictures.map(tile => (
						<GridListTile key={tile.img} cols = {tile.cols || 1}>
							<img src={tile.img} alt={tile.title}></img>
						</GridListTile>
					))}
				</GridList>
			</div>



			// <div>
			// 	<table className='hiddenalbum'>
			// 		<thead>
			// 			<tr>
			// 				<th id='hiddenalbumheader' className='photoalbum'> <h2> Interests </h2> </th>
			// 			</tr>
			// 		</thead>
			// 		<tbody>
			// 			<tr>
			// 				{td}
			// 				{/* <td> <img className='hiddenlibrary' src={this.pictures[0]} alt='Hidden 1'/> </td>
			// 				<td> <img className='hiddenlibrary' src={this.pictures[1]} alt='Hidden 2'/> </td>
			// 				<td> <img className='hiddenlibrary' src={this.pictures[2]} alt='Hidden 3'/> </td> */}
			// 			</tr>
			// 			<tr>
			// 				{td2}
			// 				{/* <td> <img className='hiddenlibrary' src={this.pictures[3]} alt='Hidden 4'/> </td>
			// 				<td> <img className='hiddenlibrary' src={this.pictures[4]} alt='Hidden 5'/> </td>
			// 				<td> <img className='hiddenlibrary' src={this.pictures[5]} alt='Hidden 6'/> </td> */}
			// 			</tr>
			// 		</tbody>
			// 	</table>
			// </div>
		);	
	}

}