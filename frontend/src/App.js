import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header'
import Login from './components/Login';
import Register from './components/Register';
import Phone from './components/Phone';

import "./app.css";

class App extends Component {

  render() {

    return (
      <Router>
        <div className="container">
          <Header />
          <hr/>
          <div className="content">
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/phone/:id" component={Phone} />
          </div>
        </div>

      </Router>
    );
  }
}


export default App;
