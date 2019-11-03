import React from 'react';
import CardQueue from '../components/CardQueue'
import NavBar from '../components/navbar';

class Home extends React.Component {
    render()  {
        return (
            [<NavBar></NavBar>,
            <CardQueue></CardQueue>]
          );
      } 
  }
export default Home;
