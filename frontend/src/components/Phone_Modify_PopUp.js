import React, { Component } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class Phone_Modify_PopUp extends Component {

  state = {
    phoneName : '',
    phoneNumber : '',
    }

    handleChange(e){
      this.setState({[e.target.name] : e.target.value});
    }

    handleClick_Modify(){
      let data = {
                name : (this.state.phoneName.length === 0)? this.props.name : this.state.phoneName ,
                number: (this.state.phoneNumber.length === 0)? this.props.number : this.state.phoneNumber,
                phone_id : this.props.id
            }

      axios.post("http://localhost:4000/phone/modify", data )
      .then(response=>{
        this.props.popupToggle();
        this.props.reRender();
      })
      .catch(error=>{
        console.log(error);
      });
    }

  render() {

    let { name, number } = this.props;

    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h2>전화번호부 수정</h2>
          <input type="text" name="phoneName" onChange={this.handleChange.bind(this)}
             placeholder={name}/>
          <input type="text" name="phoneNumber" onChange={this.handleChange.bind(this)}
            placeholder={number}/>
          <button onClick={this.handleClick_Modify.bind(this)}>수정</button>
          <button onClick={this.props.popupToggle}>취소</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    id : state.phoneReducer.id,
    name : state.phoneReducer.phoneName,
    number : state.phoneReducer.phoneNumber
  }
}


export default connect(mapStateToProps,null)(Phone_Modify_PopUp);
