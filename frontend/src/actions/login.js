export function loginToggle(userid, username){
  return{
    type: 'LOGIN',
    userid, username
  }
}

export function logoutToggle(){
  return{
    type: 'LOGOUT'
  }
}
