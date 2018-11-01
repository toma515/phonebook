import React, { Component } from 'react';
import axios from 'axios';

import Layout_ID_PW from './Layout_ID_PW';

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
        <Layout_ID_PW msg="회원가입"
          handleClick={this.handleClick.bind(this)}
          handleChange={this.handleChange.bind(this)}
        />
        </div>

    );
  }
}

export default Register;
