import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from '../actions/logAction';

class Header extends Component {

  // state = {
  //   logged : false
  // }

  handleClick_LoginCheck(){
    if(!this.props.logged){
      alert("로그인해주세요");
    }
  }

  handleClick_Logout(){
    if(this.props.logged){
      alert("로그아웃 하셨습니다.");
      this.props.onLogout();

    }
  }

  render() {
    const {logged} = this.props;
    const phoneURL = logged? "/phone/"+ this.props.userid : "/";
    console.log(this.props.logged);

    return (

        <div>
          <h1>REST 전화번호부</h1>
          <Link to="/" onClick={this.handleClick_Logout.bind(this)}>{this.props.logName}</Link>
          <Link to="/register">회원가입</Link>
          <Link to={phoneURL} onClick={this.handleClick_LoginCheck.bind(this)}>전화번호부</Link>
        </div>


    );
  }
}

const mapStateToProps = (state)=>{
  return{
      logged : state.logReducer.logged,
      logName : state.logReducer.logName,
      userid : state.logReducer.userid
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onLogout : ()=>{dispatch(logoutAction())}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
