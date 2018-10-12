const initialState ={
  logged : false,
  userid : '',
  username : ''
}

const loggedControl = ( state = initialState , action )=>{
  switch (action.type) {
    case 'LOGIN':
      return{
        logged : true,
        userid : action.id,
        username : action.username
      }
    case 'LOGOUT':
      return{
        logged : false,
        userid : action.id,
        username : ''
      }

    default:
        return state;

  }

}

export default loggedControl;
