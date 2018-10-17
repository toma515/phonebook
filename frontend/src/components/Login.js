import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { loginAction } from '../actions/logAction';



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
          console.log(response.data);

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
          <h2>로그인</h2>
          <div>
            <span>아이디 : </span>
            <input type="text" name="username"
              onChange={this.handleChange.bind(this)} />
          </div>
          <div>
            <span>비밀번호 : </span>
            <input type="password" name="userpass"
            onChange={this.handleChange.bind(this)} />
          </div>

          <button onClick={this.handleClick.bind(this)} >로그인하기</button>

        </div>

    );
  }
}

// const mapStateToProps = (state)=>{
//   return{
//     logged : state.loginout.logged
//   }
// }

const mapDispatchToProps = (dispatch)=>{
  return{
    onLogin : (userid, username)=>{ dispatch(loginAction(userid, username))}
  }
}

export default connect(null,mapDispatchToProps)(Login);
