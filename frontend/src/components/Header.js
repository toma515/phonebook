import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutAction } from '../actions/logAction';

class Header extends Component {

  handleClick_Logout(){
    if(this.props.logged){
      alert("로그아웃 하셨습니다.");
      this.props.onLogout();
    }
  }

  render() {
    const { logged } = this.props;
    const registerURL = logged? "/phone/"+ this.props.userid : "/register";
    const phoneURL = logged? "/phone/"+ this.props.userid : "/";

    return (

        <div className="header">
          <h1>REST 전화번호부</h1>
          <div className="menu">
            <Link to="/" onClick={this.handleClick_Logout.bind(this)}>{this.props.logName}</Link>
            <Link to={registerURL} onClick={()=>{
              if(this.props.logged){
              alert("로그인중입니다.");
            }}}>회원가입</Link>
            <Link to={phoneURL} onClick={()=>{
              if(!this.props.logged){
              alert("로그인해주세요");
            }}}>전화번호부</Link>
          </div>
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
