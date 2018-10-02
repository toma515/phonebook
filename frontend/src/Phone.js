import React, { Component } from 'react';
import axios from "axios";

class Phone extends Component {
  state = {
    phoneName : '',
    phoneNumber : '',
    phoneList : []
  }

  getList(){
    axios.get("http://localhost:4000/phone")
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
    axios.post("http://localhost:4000/phone",this.state)
    .then(response=>{
      console.log(response);
      // this.getList();
      let list = this.state.phoneList;
      this.setState({ phoneList : list.concat(
          {name : this.state.phoneName, number : this.state.phoneNumber}
        )}
      );
      // concat은 배열과 배열을 합해서 새로운 배열을 만든다.
    })
    .catch(error=>{
      console.log(error);
    });
  }

handleClick_Modify(){

}

handleClick_Delete(){

}



  componentDidMount(){
    this.getList()
  }



  render() {
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
          <button onClick={this.handleClick_Modify.bind(this)}>수정</button>
          <button onClick={this.handleClick_Delete.bind(this)}>삭제</button>
        </div>
        );
    });


    return (
        <div>
          <h2>전화번호부</h2>
          <input type="text" name="phoneName" onChange={this.handleChange.bind(this)} />
          <input type="text" name="phoneNumber" onChange={this.handleChange.bind(this)} />
          <button onClick={this.handleClick_Save.bind(this)}>저장하기</button>
          <hr />
          {list}
        </div>

    );
  }
}

export default Phone;
