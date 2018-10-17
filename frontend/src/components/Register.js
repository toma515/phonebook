import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  state = {
    username : '',
    userpass : ''
  }

  handleChange(e){
    this.setState({ [e.target.name] : e.target.value });
  }

  handleClick(){
    axios.post("http://localhost:4000/register",this.state)
      .then( (response)=>{
          console.log(response.data);
          if(response.data.success === 1){
            alert("회원가입을 축하합니다. 로그인 해주세요.")
            this.props.history.push('/');
          }else if(response.data.success === -1){
            alert("아이디를 입력해주세요.");
          }else if(response.data.success === -2){
            alert("비밀번호를 입력해주세요.")
          }else if(response.data.success === -3){
            alert("중복된 아이디입니다.")
          }
      })
      .catch( (error)=>{
        console.log(error);
      });
  }


  render() {
    return (
        <div>
          <h2>회원가입</h2>
          <div>
            <span>아이디 : </span>
            <input type="text" name='username' onChange={this.handleChange.bind(this)} />
          </div>
          <div>
            <span>비밀번호 : </span>
            <input type="password" name='userpass' onChange={this.handleChange.bind(this)} />
          </div>
          <button onClick={this.handleClick.bind(this) }>가입하기</button>
        </div>

    );
  }
}

export default Register;
