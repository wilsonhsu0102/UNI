import React from 'react';
import { Link } from 'react-router-dom';
import './MessageContainer.css'

export default function ChatMessage(name, message, connection) {
	if(connection){
		return (
			<div className="connectionMess">
				<p className="chatName">{name}</p>
				<p className="chatMessage">{message}</p>
			</div>
		);
	}
	else{
		return (
			<div className="yourMess">
				<p className="chatName">{name}</p>
				<p className="chatMessage">{message}</p>
			</div>
		);
	}
    
  }