const initialState ={
  id : 0,
  phoneName : '',
  phoneNumber : '',
  message : ''

}

const phoneControl = ( state = initialState , action )=>{
  switch (action.type) {
    case 'SAVE':
      return{
        id : 0,
        phoneName : '',
        phoneNumber : '',
        message : 'save'
      }
    case 'MODIFY':
      return{
        id : action.id,
        phoneName : action.name,
        phoneNumber : action.number,
        message : 'modify'
      }
    default:
        return state;

  }

}

export default phoneControl;
