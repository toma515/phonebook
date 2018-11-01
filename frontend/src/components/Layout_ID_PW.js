import React,{Component} from "react";

class Layout_ID_PW extends Component {

  handleKeyPress(e){
    // console.log(e.key);
    if(e.key === 'Enter')
      this.props.handleClick();
    }

  render() {
    return (
        <div className="user">
          <h2>{this.props.msg}</h2>
          <div className="userid">
            <span>아이디 : </span>
            <input type="text" name="username" onChange={this.props.handleChange}
            onKeyPress={this.handleKeyPress.bind(this)} />
          </div>
          <div className="userpass">
            <span>비밀번호 : </span>
            <input type="password"  name="userpass" onChange={this.props.handleChange}
            onKeyPress={this.handleKeyPress.bind(this)} />
          </div>

          <button className="btn_1" onClick={this.props.handleClick} >{this.props.msg}</button>

        </div>

    );
  }
}

export default Layout_ID_PW;
