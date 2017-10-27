import dispatcher from '../Dispatcher'

export function createNewPerson(name, lastName, address){
  dispatcher.dispatch({
    type: 'CREATE_NEW_PERSON',
    name,
    lastName,
    address,
  });
}

export function deletePerson(id){
  dispatcher.dispatch({
    type: 'DELETE_PERSON',
    id,
  })
}

export function lookPerson(id){
  dispatcher.dispatch({
    type: 'LOOK_FOR_PERSON',
    id,
  })
}
