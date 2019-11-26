import React from 'react';
import NavBar from '../components/navbar';
import constants from '../lib/constants'

class CreateEvent extends React.Component {
    render() {
        return [<NavBar key={'NavBar'}/>, <h1 key={'redirect to new page'}> Create Default Event Page </h1>]
    }
}

export default CreateEvent