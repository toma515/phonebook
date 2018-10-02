import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Phone from './Phone';

class App extends Component {

  state = {
    logged : false
  }

  render() {
    return (
      <Router>
        <div className="App">
          <h1>프론트엔드</h1>
          <Link to="/">로그인</Link>
          <Link to="/register">회원가입</Link>
          <Link to="/phone">전화번호부</Link>
          <hr/>
          <div>
            <Route exact path="/" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/phone" component={Phone} />
          </div>
        </div>

      </Router>
    );
  }
}

export default App;
