import React from "react";

export default class SelfIntro extends React.Component {
	constructor(props) {
		super()
		this.id = this.props
		// will retrieve self bio from props when set up correctly
		this.aboutMe = "Hello, I'm Wilson. I'm a 3rd year CS Student at Uoft. I am the Vice President of Rocsaut. Some people say I look like the famous Korean actor Lee Min Ho, but I don't see it. Take a peek below to see if we have any common interests!"
		console.log("This is the bio information for " + this.id);
	}


	render() {
		return (
			<div id='selfintrodiv'>
				<h4 class='selfintro'>Self-Introduction</h4>
				<p class='selfintro'> {this.aboutMe} </p>
			</div>
		);
	}
}