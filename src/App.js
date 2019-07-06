import React from 'react';
import { HashRouter, Route, Switch } from "react-router-dom"
import './App.css';

import AdminView from './components/AdminView.js';
import GuestView from './components/GuestView.js';

function App() {
  return (
    <HashRouter basename='/'>
      <div style={{padding: 20}}>
        <Switch>
          <Route
            path='/admin/:key/'
            render={props => <AdminView {...props} />} />
          <Route
            render={props => <GuestView {...props} />} />
        </Switch>
      </div>
    </HashRouter>
  );
}

export default App;
