import React from 'react';
import { Route, Switch, Link } from 'react-router-dom'
import './App.css';

import Login from './components/Login'
import FriendsList from './components/FriendsList'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <div className="App">
      <Link to="/login">Login</Link>
      <Link to="/protected">Friends List</Link>

      <Switch>
        <PrivateRoute exact path="/protected" component={FriendsList} />
        <Route path="/login" component={Login} />
        <Route component={Login} />
      </Switch>
    </div>
  );
}

export default App;
