import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './login';
import Register from './register';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={() => (<Register />)} />
          </Switch>
        </div>
      </Router>
    );
  }
}
