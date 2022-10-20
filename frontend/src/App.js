import request from 'request';
import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import './App.css';
import UsersList from './components/Users';
import Header from './components/Menu';
import Footer from './components/Footer';

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
      <div className="sub_body">
        <div className="top">
          <Header />
          <UsersList users={this.state.users}/>
        </div>
        <div className="footer bg-light">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;