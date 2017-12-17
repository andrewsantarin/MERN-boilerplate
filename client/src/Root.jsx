import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'

import App from './app/App';
import Home from './page/Home';
import NotFound from './page/NotFound';

import Counter from './counter/Counter';
import Posts from './post/Posts';
import HelloWorld from './hello-world/HelloWorld';

import './styles/styles.scss';

export default function Root(props) {
  return (
    <Router>
      <App>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/counter" component={Counter}/>
          <Route path="/post" component={Posts}/>
          <Route path="/hello-world" component={HelloWorld}/>
          <Route component={NotFound}/>
        </Switch>
      </App>
    </Router>
  );
}
