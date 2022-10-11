import request from 'request';
import React, { Component } from 'react';
import './App.css';
import usersList from './components/Users';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': []
    }
  }

  componentDidMount() {
    request('http://localhost:8000/api/users/', (error, response, body) => {
    if (error) {
      console.error(error);
      return;
    }
    const users = JSON.parse(body);
    this.setState(
      {'users': users}
    )
  });
  }

  render() {
    return (
      <div className='tab_container'>
        {usersList(this.state.users)}
      </div>
    );
  }
}

export default App;