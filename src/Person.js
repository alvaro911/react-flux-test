import React, { Component } from 'react';

import './Person.css';
import PeopleStore from './stores/peopleStore';

class Person extends Component {
  lookPerson() {
    const edit = PeopleStore.lookPerson(this.props.id);
    console.log('THIS IS EDIT ', edit);
    this.setState({
      personName: edit.personName,
      personLastName: edit.lastName,
      personAddress: edit.address,
    })
  }

  render(){
    return (
      <div className="person-card">
        <div className="person-info">
          <h2>{this.props.name} {this.props.lastName}</h2>
          <h4>{this.props.address}</h4>
        </div>
        <div className="person-settings">
          <button onClick={() => this.props.findPerson(this.props.id)}>Edit</button>
          <button onClick={this.props.delete.bind(this)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default Person
