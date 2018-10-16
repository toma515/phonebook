const initialState ={
  logged : false,
  logName : '로그인',
  userid : 0,
  username : ''

}

const loginControl = ( state = initialState , action )=>{
  switch (action.type) {
    case 'LOGIN':
      return{
        logged : true,
        logName : "로그아웃",
        userid : action.userid,
        username : action.username
      }
    case 'LOGOUT':
      return{
        logged : false,
        logName : "로그인",
        userid : 0,
        username : ''
      }

    default:
        return state;

  }

}

export default loginControl;
