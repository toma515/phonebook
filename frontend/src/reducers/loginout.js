const initialState ={
  logged : false
}

const loggedControl = ( state = initialState , action )=>{
  switch (action.type) {
    case 'LOGIN':
      return{
        logged : true
      }
    case 'LOGOUT':
      return{
        logged : false
      }

    default:
        return state;

  }

}

export default loggedControl;
