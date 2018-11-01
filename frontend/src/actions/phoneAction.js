export function saveAction(){
  return{
    type: 'SAVE'
  }
}

export function modifyAction(id, name, number){
  return{
    type: 'MODIFY',
    id, name, number
  }
}
