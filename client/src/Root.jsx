import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './app/App';
import NotFound from './page/NotFound';

import Counter from './counter/Counter';

import HelloWorld from './hello-world/HelloWorld';

import './styles/styles.scss';

export default function Root(props) {
  return (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Counter}/>
          <Route path="/hello-world" component={HelloWorld}/>
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  );
}
