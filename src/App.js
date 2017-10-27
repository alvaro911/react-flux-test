import React, { Component } from 'react';

import './App.css';
import Person from './Person';
import PeopleStore from './stores/peopleStore';
import * as PeopleActions from './actions/PeopleActions';

class App extends Component {
  constructor(){
    super();
    this.state = {
      people: PeopleStore.getAllPeople(),
      name: '',
      lastName: '',
      address: '',
      isEditing: false,
      personName: '',
      personLastName: '',
      personAddress: '',
      toEdit: ''
    };
    PeopleStore.on('change', () => {
      this.setState({
        people: PeopleStore.getAllPeople()
      })
    })
  }

  onSubmit = (e) => {
    e.preventDefault();
    PeopleActions.createNewPerson(this.state.name, this.state.lastName, this.state.address);
  }

  personInfo = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deletePerson(){
    PeopleActions.deletePerson(this.props.id);
  }

  lookPerson() {
    const edit = PeopleStore.lookPerson(this.props.id);
    console.log('THIS IS EDIT ', edit);
    this.setState({
      personName: edit.name,
      personLastName: edit.lastName,
      personAddress: edit.address,
    })
  }

  submitPersonEdit(e){
    e.preventDefault()
  }

  personChangeInfo(e){
    this.setState({
      personName: e.target.value
    })
  }

  render() {
    console.log('THIS IS TO EDIT ',this.state.toEdit);
    const { people } = this.state;
    const PersonComponent = people.map((person) => {
      return <Person key={person.id} {...person} delete={this.deletePerson} findPerson={this.lookPerson}/>
    })
    return (
      <div>
        <header>
          <h1>React / flux people list</h1>
        </header>
        <main>
          {PersonComponent}
        </main>

        {/* THIS FORM IS TO ADD PEOPLE */}
        <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Name</label>
          <input onChange={this.personInfo} type="text" name="name" value={this.state.name} />
          <label htmlFor="lastName">Last name</label>
          <input onChange={this.personInfo} type="text" name="lastName" value={this.state.lastName} />
          <label htmlFor="address">Address</label>
          <input onChange={this.personInfo} type="text" name="address" value={this.state.address} />

          <button type="submit">OK</button>
        </form>

        {/* THIS FORM IS TO EDIT PEOPLE */}
        <form onSubmit={this.submitPersonEdit}>
          <label htmlFor="personName">Name</label>
          <input
            name="personName" type="text"
            onChange={this.personChangeInfo}
            value={this.state.personName}
            onBlur={() => this.props.actions.updateInput(this.state.personName)}/>
        </form>

        <section>
          <div>+</div>
          <p>Add a new contact</p>
        </section>
      </div>
    );
  }
}

export default App;
