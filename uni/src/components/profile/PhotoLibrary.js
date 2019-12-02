import React from "react";
import './ProfilePage.css'
import constants from '../../lib/constants'
import axios from 'axios'; 
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

export default class PhotoLibrary extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			account: {},
			pictures: [],
		}
	}

	componentDidMount(){
		console.log("Loading photo album for profile.")
		axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/images/all`, {withCredentials: true})
        .then(res => {
			let filtered = []
			console.log(res.data)
			res.data.forEach((pic) => {
				if (pic.type === 'photolib') {
					filtered.push({img: pic.path, title: "", author: "", cols: 2})
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
		axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/student/getAccount`, {withCredentials: true})
		.then(res => {
			
            this.setState({
                account: res.data
			})
			console.log(this.state.account)
        })
        .catch(err => {
            console.log(err);
        })
        .finally(() => {
		
		})
	}

	render() {
		const bgcolor = makeStyles(theme => {
			return theme.palette.background.paper;
		})
		return (
			<div className="gridlistdiv" style={{backgroundColor: bgcolor}}>
				<h2> Album </h2>
				<GridList cellHeight={160} className="gridlist" cols={4}>
					{this.state.pictures.map(tile => (
						<GridListTile key={tile.img} cols = {tile.cols || 1}>
							<img src={tile.img} alt={tile.title}></img>
						</GridListTile>
					))}
				</GridList>
			</div>
		);	
	}

}