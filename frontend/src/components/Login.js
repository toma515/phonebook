import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { loginAction } from '../actions/logAction';

import Layout_ID_PW from './Layout_ID_PW';


class Login extends Component {
  state = {
    username : '',
    userpass : ''
  }

  handleChange(e){
    this.setState({ [e.target.name] : e.target.value });
  }

  handleClick(){
    axios.post("http://localhost:4000/login",this.state)
      .then( (response)=>{

          if(response.data.success === 1){
            let { id, username } = response.data.result;
            this.props.onLogin(id, username);
            alert(`${username}님 환영합니다.`);
            this.props.history.push('/phone/'+id);

          }else if (response.data.success === -1) {
            alert("아이디 오류. 다시입력해주세요");
          }else if ( response.data.success === -2) {
            alert("비밀번호 오류. 다시입력해주세요");

          }

      })
      .catch( (error)=>{
        console.log(error);
      });
  }

  render() {
    return (
        <div>
          <Layout_ID_PW msg="로그인"
            handleClick={this.handleClick.bind(this)}
            handleChange={this.handleChange.bind(this)}
          />
        </div>

    );
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    onLogin : (userid, username)=>{ dispatch(loginAction(userid, username))}
  }
}

export default connect(null,mapDispatchToProps)(Login);
