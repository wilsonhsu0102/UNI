import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './routes/homepage';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
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
    <div>
        <BrowserRouter>
          <Switch> { /* Similar to a switch statement - shows the component depending on the URL path */ }
            { /* Each Route below shows a different component depending on the exact path in the URL  */ }
            <Route exact path='/' component={Home}/>
          </Switch>
        </BrowserRouter>
      </div>
  );
}

export default App;
