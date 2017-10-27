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
    };
    // this.personInfo = this.personInfo.bind(this)
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

  editPersonInfo(e){
    this.setState({
      personName: e.target.value
    })
  }

  deletePerson(){
    PeopleActions.deletePerson(this.props.id)
  }

  lookPerson(){
    const editPerson = PeopleStore.lookPerson(this.props.id)
    this.setState({
      personName: editPerson.name,
      personLastName: editPerson.lastName,
      personAddress: editPerson.address
    })
  }

  render() {
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

        {/* <form onSubmit={this.onSubmit}>
          <label htmlFor="name">Name</label>
          <input onChange={this.personInfo} type="text" name="name" value={this.state.name} />
          <label htmlFor="lastName">Last name</label>
          <input onChange={this.personInfo} type="text" name="lastName" value={this.state.lastName} />
          <label htmlFor="address">Address</label>
          <input onChange={this.personInfo} type="text" name="address" value={this.state.address} />

          <button type="submit">OK</button>
        </form> */}

        <form onSubmit={this.editInfoSubmit}>
          <label htmlFor="personName">Name</label>
        <input
          onChange={this.editPersonInfo}
          type="text" name="personName"
          value={this.state.personName}
          onBlur={() => this.props.actions.updateInput(this.state.personName)}
        />
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
