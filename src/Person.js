import React, { Component } from 'react';

import './Person.css';

class Person extends Component {
  render(){
    return (
      <div className="person-card">
        <div className="person-info">
          <h2>{this.props.name} {this.props.lastName}</h2>
          <h4>{this.props.address}</h4>
        </div>
        <div className="person-settings">
          <button onClick={this.props.findPerson.bind(this)}>Edit</button>
          <button onClick={this.props.delete.bind(this)}>Delete</button>
        </div>
      </div>
    );
  }
}

export default Person
