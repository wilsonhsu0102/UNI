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
			account: {},
			pictures: []
		}
	}

	componentDidMount(){
        console.log("Loading interest album for profile.")
		axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/images/all/${this.props.id}`, {withCredentials: true})
        .then(res => {
			let filtered = []
			console.log(res)
			console.log(res.data)
			res.data.forEach((pic) => {
				if (pic.type === 'hiddenlib') {
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
        axios.get(`${constants.HTTP}${constants.HOST}${constants.PORT}/student/getAccount/${this.props.id}`, {withCredentials: true})
		.then(res => {
			
            this.setState({
                account: res.data
            })
            console.log(res)
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
			<div className="hiddengridlistdiv" style={{backgroundColor: bgcolor}}>
				<h2> Interests </h2>
				<GridList cellHeight={160} className="hiddengridlist" cols={4}>
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