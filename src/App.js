import React, { Component } from 'react';
import Dock from 'react-dock';

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
      personName: '',
      personLastName: '',
      personAddress: '',
      personId: '',
      isVisible: false,
      isEditVisible: false,
    };
    PeopleStore.on('change', () => {
      this.setState({
        people: PeopleStore.getAllPeople()
      })
    })

    this.handleEditPersonClick = this.handleEditPersonClick.bind(this)
    this.personChangeInfo = this.personChangeInfo.bind(this)
    this.submitPersonEdit = this.submitPersonEdit.bind(this)
    this.showDocker = this.showDocker.bind(this)
  }

  onSubmit = (e) => {
    e.preventDefault();
    PeopleActions.createNewPerson(this.state.name, this.state.lastName, this.state.address);
    this.setState({
      name: '',
      lastName: '',
      address: '',
    })
  }

  personInfo = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  deletePerson(){
    PeopleActions.deletePerson(this.props.id);
  }

  handleEditPersonClick(id){
    const index = this.state.people.findIndex(person => person.id === id)
    this.setState({
      isEditVisible: true,
      personName: this.state.people[index].name,
      personLastName: this.state.people[index].lastName,
      personAddress: this.state.people[index].address,
      personId: this.state.people[index].id,
    })
  }

  submitPersonEdit(e){
    e.preventDefault()
    PeopleActions.updatePerson(
      this.state.personId,
      {
        name: this.state.personName,
        lastName: this.state.personLastName,
        address: this.state.personAddress,
      }
    );
  }

  personChangeInfo(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  showDocker(){
    this.setState({
      isVisible: true
    })
  }

  render() {
    console.log('this is the person to update ', this.state.personName);
    const { people } = this.state;
    const PersonComponent = people.map((person) => {
      return <Person key={person.id} {...person} delete={this.deletePerson} findPerson={this.handleEditPersonClick}/>
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
        <Dock
          position="left"
          isVisible={this.state.isVisible}
          className="dock-form"
        >
          <div className="dock-header"><h3 onClick={() => this.setState({isVisible: false})}>close</h3></div>
          <form onSubmit={this.onSubmit}>
            <label htmlFor="name">Name</label>
            <input
              onChange={this.personInfo}
              type="text" name="name"
              value={this.state.name}
            />
            <label htmlFor="lastName">Last name</label>
            <input
              onChange={this.personInfo}
              type="text" name="lastName"
              value={this.state.lastName}
            />
            <label htmlFor="address">Address</label>
            <input
              onChange={this.personInfo}
              type="text" name="address"
              value={this.state.address}
            />

            <button
              onClick={() => this.setState({isVisible: !this.state.isVisible})}
              type="submit"
            >submit</button>
          </form>
        </Dock>

        {/* THIS FORM IS TO EDIT PEOPLE */}
        <Dock
          position="right"
          isVisible={this.state.isEditVisible}
          className="dock-form"
        >
          <div className="dock-header"><h3 onClick={() => this.setState({isEditVisible: false})}>close</h3></div>
          <form onSubmit={this.submitPersonEdit}>
            <label htmlFor="personName">Name</label>
            <input
              name="personName" type="text"
              onChange={this.personChangeInfo}
              value={this.state.personName}
            />
          <label htmlFor="personLastName">LastName</label>
            <input
              name="personLastName" type="text"
              onChange={this.personChangeInfo}
              value={this.state.personLastName}
            />
          <label htmlFor="personAddress">Address</label>
            <input
              name="personAddress" type="text"
              onChange={this.personChangeInfo}
              value={this.state.personAddress}
            />

            <button
              onClick={() => this.setState({isEditVisible: !this.state.isEditVisible})}
              type="submit"
            >submit</button>
          </form>
        </Dock>

        <section>
          <div onClick={this.showDocker}>+</div>
          <p>Add a new contact</p>
        </section>
      </div>
    );
  }
}
export default App;
