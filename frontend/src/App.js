import request from 'request';
import React, { Component } from 'react';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import './App.css';
import UsersList from './components/Users';
import Header from './components/Menu';
import Footer from './components/Footer';
import NotFound404 from './components/NotFound404';


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
    const parsedData = JSON.parse(body);
    console.log(parsedData.results)
    this.setState(
      {'users': parsedData.results}
    )
    console.log(this.state.users)
  });
  }

  render() {
    return (
      <div className="sub_body">
        <div className="top">
          <BrowserRouter>
            <Header />
              <Routes>
                <Route path='/' element={<Navigate to='/users' />} />
                  <Route path='todo' element={<UsersList users={this.state.users}/>} />
                  <Route path='projects' element={<UsersList users={this.state.users}/>} />
                  <Route path='users' element={<UsersList users={this.state.users}/>} />
                  <Route path='*' element={<NotFound404 />} />
              </Routes>
          </BrowserRouter>
        </div>
        <div className="footer bg-light">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;