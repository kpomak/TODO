import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }
  render() {
    return (
      <div>
        Main App
      </div>
    );
  }
}

export default App;