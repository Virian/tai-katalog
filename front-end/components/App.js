import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './login';
import Register from './register';
import Gallery from './gallery';
import EditPhoto from './editPhoto';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/register' component={() => (<Register />)} />
            <Route exact path='/gallery' component={() => (<Gallery />)} />
            <Route exact path='/edit/:photoId' component={EditPhoto} />
            <Route exact path='*' component={() => (<Login />)} />
          </Switch>
        </div>
      </Router>
    );
  }
}
