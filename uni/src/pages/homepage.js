import React from 'react';
import CardQueue from '../components/CardQueue'
import NavBar from '../components/navbar';
import { SessionContext, getSessionCookie, setSessionCookie } from "../session";

class Home extends React.Component {
    render()  {
        console.log(this.props.id)
        
        let res = getSessionCookie()
        console.log("user is", res)
        return (
            [<NavBar id = {res}></NavBar>,
            <CardQueue id = {res}></CardQueue>]
          );
      } 
  }
export default Home;
