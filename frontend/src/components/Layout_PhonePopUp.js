import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Layout_PhonePopUp extends Component {

  state = {
    phoneName : '',
    phoneNumber : '',
    }

    handleChange(e){
      this.setState({[e.target.name] : e.target.value});
    }

    handleKeyPress(e){
      if(e.key === 'Enter')
        this.handleClick_Action();
    }

    handleClick_Action(){
      if(this.props.message === 'modify'){
        let data = {
          name : (this.state.phoneName.length === 0)? this.props.name : this.state.phoneName ,
          number: (this.state.phoneNumber.length === 0)? this.props.number : this.state.phoneNumber,
          id : this.props.phone_id
        }
        axios.put("http://localhost:4000/phone", data )
        .then(response=>{
          if(response.data.success === 1){
            alert("수정 되었습니다.");
            this.props.popupToggle();
            this.props.reRender();
          }else { }
        })
        .catch(error=>{
          console.log(error);
        });
      }

      if(this.props.message === 'save'){
        let data = {
          name : this.state.phoneName,
          number : this.state.phoneNumber,
          id : this.props.user_id
        }

        axios.post("http://localhost:4000/phone", data )
        .then(response=>{
          if(response.data.success === 1){
            alert("저장 되었습니다.");
            this.props.popupToggle();
            this.props.reRender();
          }else {
            alert("이미 등록된 정보입니다.")
          }
        })
        .catch(error=>{
          console.log(error);
        });

      }
    }

  render() {

    let { name, number } = this.props;
    let msg = this.props.message === 'modify'? '수정' : '저장';

    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h2>전화번호부 {msg}</h2>
          <div className="userid">
            <span>이 름 : </span>
            <input type="text" name="phoneName" onChange={this.handleChange.bind(this)}
              onKeyPress={this.handleKeyPress.bind(this)} placeholder={name}/>
          </div>
          <div className="userpass">
             <span>전화번호 : </span>
             <input type="text" name="phoneNumber" onChange={this.handleChange.bind(this)}
               onKeyPress={this.handleKeyPress.bind(this)} placeholder={number}/>
          </div>
          <button className="btn_2" onClick={this.handleClick_Action.bind(this)}>{msg}</button>
          <button className="btn_2" onClick={this.props.popupToggle}>취소</button>

      </div>
    </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    phone_id : state.phoneReducer.id,
    user_id : state.logReducer.userid,
    name : state.phoneReducer.phoneName,
    number : state.phoneReducer.phoneNumber,
    message : state.phoneReducer.message
  }
}


export default connect(mapStateToProps,null)(Layout_PhonePopUp);
