const initialState ={
  id : 0,
  phoneName : '',
  phoneNumber : ''

}

const phoneControl = ( state = initialState , action )=>{
  switch (action.type) {
    case 'Save':
      return{

      }
    case 'MODIFY':
      return{
        id : action.id,
        phoneName : action.name,
        phoneNumber : action.number
      }
    case 'DELETE':
      return{

      }

    default:
        return state;

  }

}

export default phoneControl;
