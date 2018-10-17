import React, { Component } from 'react';
import axios from "axios";
import {connect} from 'react-redux';
import {modifyAction} from '../actions/phoneAction';

import Phone_Modify_PopUp from './Phone_Modify_PopUp';

class Phone extends Component {
  state = {
    PopUpShow : false,
    phoneName : '',
    phoneNumber : '',
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
    let {phoneName, phoneNumber } = this.state;
    if(window.confirm(" 이름 : "+ phoneName +" 전화번호 : "+
    phoneNumber + "<br/> 저장하시겠습니까?")){
      let data = {
        name : this.state.phoneName,
        number : this.state.phoneNumber,
        user_id : this.props.userid
      }

      axios.post("http://localhost:4000/phone/save",data)
      .then(response=>{
        // console.log(response);

        this.getList();

        // let list = this.state.phoneList;
        // this.setState({ phoneList : list.concat(
        //     {name : this.state.phoneName, number : this.state.phoneNumber}
        //   )}
        // );
        // concat은 배열과 배열을 합해서 새로운 배열을 만든다.
      })
      .catch(error=>{
        console.log(error);
      });
    }else{}

  }
handleClick_Modify(data){

  // console.log(data);
  this.props.onModify(data.phone_id, data.name, data.number);
  this.popupToggle();

  // console.log(data);
  // data = {  name : (this.state.phoneName.length === 0)? data.name : this.state.phoneName ,
  //           number: (this.state.phoneNumber.length === 0)? data.number : this.state.phoneNumber,
  //           phone_id : data.phone_id
  //       }
  // console.log(data);
  // axios.post("http://localhost:4000/phone/modify", data )
  // .then(response=>{
  //   console.log(response.result);
  //   this.getList();
  // })
  // .catch(error=>{
  //   console.log(error);
  // });
}

handleClick_Delete(id){
  if(window.confirm("정말 삭제하시겠습니까?")){
    let data = { id } ;
    axios.post("http://localhost:4000/phone/delete", data )
    .then(response=>{
      // console.log(response);
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
    // console.log(this.props.userid);

    const {phoneList} = this.state;
    const styles ={
      padding:20, borderWidth:1, borderStyle: 'solid',
      marginBottom:5
    }
    const list = phoneList.map((value,index)=>{
      return(
        <div key={value.phone_id} style={styles}>
          <div>이름 : {value.name}</div>
          <div>전화번호 : {value.number}</div>

          <button onClick={this.handleClick_Modify.bind(this,value)}>수정</button>
          <button onClick={this.handleClick_Delete.bind(this, value.phone_id)}>삭제</button>
        </div>
        );
    });


    return (
        <div>
          <h2 >{this.props.username} 님 전화번호부</h2>
          <input type="text" name="phoneName" onChange={this.handleChange.bind(this)} />
          <input type="text" name="phoneNumber" onChange={this.handleChange.bind(this)} />
          <button onClick={this.handleClick_Save.bind(this)}>저장하기</button>
          <hr />
          {list}
          {this.state.PopUpShow ?
          <Phone_Modify_PopUp
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
    onModify : (id,name,number)=>{ dispatch(modifyAction(id,name,number))}
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(Phone);
