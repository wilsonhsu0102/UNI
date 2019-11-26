import React from "react";

export default class SelfIntro extends React.Component {
	constructor(props) {
		super(props)
		this.id = Number(this.props.id);
		// will retrieve self bio from props when set up correctly
		if (this.id !== 1) {
			this.aboutMe = "Hello, I'm Wilson. I'm a 3rd year CS Student at Uoft. I am the Vice President of Rocsaut. Some people say I look like the famous Korean actor Lee Min Ho, but I don't see it. Take a peek below to see if we have any common interests!"
		} else {
			this.aboutMe = "Hello, I'm Authur, I only have negative thoughts. I just found out that my life is not a tragedy, it is actually a comedy."
		}
		console.log("This is the bio information for " + this.id);
	}

	render() {
		return (
			<div id='selfintrodiv'>
				<h4 className='selfintro'>Self-Introduction</h4>
				<p className='selfintro'> {this.aboutMe} </p>
			</div>
		);
	}
}