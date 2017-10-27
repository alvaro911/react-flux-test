import EventEmitter from 'events';

import dispatcher from '../Dispatcher';
import faker from 'faker';

class PeopleStore extends EventEmitter{
  constructor(){
    super()
    this.people = [
      {
        id: 1,
        name: 'Alvaro',
        lastName: 'Gomez',
        address: '550 N Lincoln Ave',
      },
      {
        id: 2,
        name: 'Hillarie',
        lastName: 'Burrows',
        address: '3795 W Periwinkle Dr',
      },
      {
        id: 3,
        name: 'Frank',
        lastName: 'Gehry',
        address: '123 S Main St',
      },
    ]
  }

  createNewPerson(name, lastName, address){
    function fakeId(){
      return faker.random.uuid();
    }
    this.people.push({
      id: fakeId(),
      name,
      lastName,
      address,
    });
    this.emit('change');
  }

  getAllPeople(){
    return this.people;
  }

  deletePerson(id){
    const index = this.people.findIndex(person => person.id === id)
    if(index > -1){
      this.people.splice(index, 1);
    }
    this.emit('change');
  }

  lookPerson(id){
    const index = this.people.findIndex(person => person.id === id);
    if(index > -1){
      console.log('THIS IS THE INDEX ', this.people[index]);
      return this.people[index]
    } else {
      alert('ELEMENT DOESN\'T EXIST');
    }
  }

  handleActions(action){
    switch(action.type){
      case 'CREATE_NEW_PERSON':
        return this.createNewPerson(action.name, action.lastName, action.address);
      case 'DELETE_PERSON':
        return this.deletePerson(action.id);
      case 'LOOK_FOR_PERSON':
        return this.lookPerson(action.id)
      default:
        return this.getAllPeople();
    }
  }
}

const peopleStore = new PeopleStore();
window.peopleStore = peopleStore
dispatcher.register(peopleStore.handleActions.bind(peopleStore))

export default peopleStore
