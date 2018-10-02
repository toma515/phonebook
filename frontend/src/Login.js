import React, { Component } from 'react';
import axios from 'axios';

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
            this.props.history.push('/phone');
          }
          if (response.data.success === -1 || response.data.success === -2) {
            alert(response.data.success);
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
          <input type="text" name="username"
            onChange={this.handleChange.bind(this)} />
            <input type="password" name="userpass"
            onChange={this.handleChange.bind(this)} />
          <button onClick={this.handleClick.bind(this)} >로그인하기</button>
        </div>

    );
  }
}

export default Login;
