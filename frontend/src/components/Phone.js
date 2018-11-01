import React, { Component } from 'react';
import axios from "axios";
import {connect} from 'react-redux';
import {saveAction, modifyAction} from '../actions/phoneAction';

import Layout_PhonePopUp from './Layout_PhonePopUp';

class Phone extends Component {
  state = {
    PopUpShow : false,
    phoneList : []
  }
  popupToggle(){
    this.setState({PopUpShow : !this.state.PopUpShow});
  }
  getList(){
    axios.get("http://localhost:4000/phone/"+ this.props.userid )
    .then((response)=>{
      if(response.data.success === 1){
        this.setState({phoneList : response.data.result});
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  handleChange(e){
    this.setState({[e.target.name] : e.target.value});
  }

  handleClick_Save(){
    this.popupToggle();
    this.props.onSave();

  }

  handleClick_Modify(data){
    this.popupToggle();
    this.props.onModify(data.phone_id, data.name, data.number);
  }


  handleClick_Delete(id){
    if(window.confirm("정말 삭제하시겠습니까?")){
      axios.delete("http://localhost:4000/phone/ " + id )
      .then(response=>{
        alert("삭제하셨습니다.")
        this.getList();
      })
      .catch(error=>{
        console.log(error);
      });
    }else{}
  }

  componentDidMount(){
    this.getList();
  }

  render() {

    const {phoneList} = this.state;

    const list = phoneList.map((value,index)=>{
      return(
        <div key={value.phone_id} className="list">
          <div className="listText" >이 름 : {value.name}</div>
          <div className="listText" >전화번호 : {value.number}</div>
          <div className="btn_collect">
            <button className="btn_2" onClick={this.handleClick_Modify.bind(this,value)}>수정</button>
            <button className="btn_2" onClick={this.handleClick_Delete.bind(this, value.phone_id)}>삭제</button>
          </div>
        </div>
        );
    });

    return (
        <div style={{position : "relative"}}>
          <h2 >{this.props.username}님 전화번호부</h2>
          <button className="btn_2 btn_add" onClick={this.handleClick_Save.bind(this)}>번호추가</button>
          <hr />
          {list}
          {this.state.PopUpShow ?
          <Layout_PhonePopUp
            popupToggle={this.popupToggle.bind(this)}
            reRender={this.getList.bind(this)}
          />
          : null
        }
        </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return{
    userid : state.logReducer.userid,
    username : state.logReducer.username
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    onSave : ()=>{ dispatch(saveAction())},
    onModify : (id,name,number)=>{ dispatch(modifyAction(id,name,number))},
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Phone);
