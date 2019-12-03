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
			account: this.props.account,
			pictures: this.props.images
		}
	}

	componentDidMount(){
		let filtered = []	
		this.state.pictures.forEach((pic) => {
			if (pic.type === 'hiddenlib') {
				filtered.push({img: pic.path, title: "", author: "", cols: 2})
			}
		})
        this.setState({
            pictures: filtered
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
							<img src={`data:image/png;base64,${tile.img}`} alt={tile.title}></img>
						</GridListTile>
					))}
				</GridList>
			</div>
		);	
	}

}