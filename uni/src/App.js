import React from 'react';
import './App.css';
import NavBar from './components/navbar';
import Home from './routes/homepage';
import Profile from './routes/ProfilePage';
import Admin from './routes/AdminPage';
import Event from './routes/EventPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter, useRouteMatch, useParams } from 'react-router-dom';
/*
import { constants } from './lib/constants';
 
import { mongoose } from 'mongoose';
mongoose.connect(constants.MONGO_DB_URL);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully!');
});*/

function App() {
  return (
    <div id="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <NavBar></NavBar>
      <div> 
        <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' component={Home}/>
          </Switch>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/profile/:profileId' children={<CallWantedProfile/>}/>
          </Switch>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/admin/:adminId' children={<CallWantedAdmin/>}/>
          </Switch>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path="/event/:eventId" children={<CallWantedEvent/>}/>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

// Calls the profile page with profileId
function CallWantedProfile() {
  let { profileId } = useParams();
  return <Profile id={profileId}/>;
}

// Calls the admin page with adminId
function CallWantedAdmin() {
  let { adminId } = useParams();
  return <Admin id={adminId}/>;
}

// Calls the event page with eventId
function CallWantedEvent() {
  let { eventId } = useParams();
  return <Event id={eventId}/>;
}

export default App;
