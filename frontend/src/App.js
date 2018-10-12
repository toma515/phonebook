import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { connect } from 'react-redux';

import Login from './Login';
import Register from './Register';
import Phone from './Phone';

class App extends Component {

  // state = {
  //   logged : false
  // }

  loginCheck(){
    if(!this.props.logged){
      alert("로그인해주세요");
    }
  }

  render() {
    const {logged} = this.props;
    const phoneURL = logged? "/phone" : "/";
    console.log(this.props.logged);
    return (
      <Router>
        <div className="App">
          <h1>REST 전화번호부</h1>
          <Link to="/">로그인</Link>
          <Link to="/register">회원가입</Link>
          <Link to={phoneURL} onClick={this.loginCheck.bind(this)}>전화번호부</Link>
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

const mapStateToProps = (state)=>{
  return{
      logged : state.login.logged
  }
}

export default connect(mapStateToProps,null)(App);
