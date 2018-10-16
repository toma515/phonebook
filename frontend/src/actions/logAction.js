export function loginAction(userid, username){
  return{
    type: 'LOGIN',
    userid, username
  }
}

export function logoutAction(){
  return{
    type: 'LOGOUT'
  }
}
