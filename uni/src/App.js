import React from 'react';
import './App.css';
import Home from './pages/homepage';
import Profile from './pages/ProfilePage';
import Admin from './pages/AdminPage';
import Event from './pages/EventPage';
import EventList from './pages/EventList'; 
import Connections from './pages/Connections';
import EditProfile from './pages/EditProfile';
import Login from './pages/Login';
import ChatPage from './pages/ChatPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch, BrowserRouter, useParams } from 'react-router-dom';


function App() {
  
  return (
    <div id="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <div> 
        <BrowserRouter> 
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' component={Login}/>
          </Switch>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/login' component={Login}/>
          </Switch>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/home' component={Home}/>
          </Switch>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/profile/:profileId' children={<CallWantedProfile/>}/>
          </Switch>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/admin' component={Admin}/>
          </Switch>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path="/event/:eventId" children={<CallWantedEvent/>}/>
          </Switch> 
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path="/eventList" component={EventList}/>
          </Switch>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path="/connections" component={Connections}/>
          </Switch>
          <Switch>
            <Route exact path="/edit/profile" children={<CallWantedProfileEdit/>}/>
          </Switch>
		  <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/chat/:connectionEmail' component={ChatPage}/>
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

// Calls the profile page with profileId 
function CallWantedProfile() {
  let { profileId } = useParams();
  console.log("cur profileId= " + profileId);
  return <Profile id={profileId}/>;
}

// Calls the event page with eventId
function CallWantedProfileEdit() {
  let { profileId } = useParams();
  return <EditProfile id={profileId}/>;
}



// Calls the event page with eventId
function CallWantedEvent() {
  let { eventId } = useParams();
  return <Event id={eventId}/>;
}

// Calls the home page with eventId
// function HomeWantedEvent() {
//   return <Home user={0}/>;
// }
export default App;
