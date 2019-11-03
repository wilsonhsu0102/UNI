import React from 'react';
import CardQueue from '../components/CardQueue'
import NavBar from '../components/navbar';

class Home extends React.Component {
    render()  {
        console.log(this.props.location)
        
        let res = this.props.id
        if (this.props.location.state != null){
            res = this.props.location.state.id
        }
        console.log("user is", res)
        return (
            [<NavBar id = {res}></NavBar>,
            <CardQueue id = {res}></CardQueue>]
          );
      } 
  }
export default Home;
