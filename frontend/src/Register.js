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
            this.props.history.push('/');
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
          <input type="text" name='username' onChange={this.handleChange.bind(this)} />
          <input type="password" name='userpass' onChange={this.handleChange.bind(this)} />
          <button onClick={this.handleClick.bind(this) }>가입하기</button>
        </div>

    );
  }
}

export default Register;
