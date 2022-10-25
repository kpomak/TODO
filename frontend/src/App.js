import React, { Component } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import UsersList from './components/Users';
import ProjectList from './components/Projects';
import ToDoList from './components/ToDo';
import Header from './components/Menu';
import Footer from './components/Footer';
import NotFound404 from './components/NotFound404';
import ProjectDetail from './components/ProjectDetail';
import Home from './components/Home';
import axios from 'axios';
import Cookies from 'universal-cookie';
import LoginForm from './components/LoginForm';


class App extends Component {
  constructor(props) {
    super(props)
    const apiPath = 'http://localhost:8000/api/'
    this.state = {
      'users': [],
      'projects': [],
      'todo': [],
      'token': '',
      'api': [
        apiPath + 'users',
        apiPath + 'projects',
        apiPath + 'todo',
      ]
    }
  }

  getToken (username, password) {
    axios.post('http://localhost:8000/api-token-auth/', {'username':username, 'password': password})
      .then(response => {
        this.saveToken(response.data['token'])})
      .catch(error => alert('Wrong value of username or password'));
  }

  saveToken (token) {
    const cookie = new Cookies();
    cookie.set('token', token);
    cookie.set('SameSite', 'None');
    this.setState({'token': token}, () => this.pullData());
  }

  isAuthentificated() {
    return (this.state.token !== '');
  }

  logOut() {
    this.saveToken('');
  }

  restoreToken () {
    const cookie = new Cookies();
    const token = cookie.get('token');
    this.setState({'token': token}, () => this.pullData());
  }

  getHeaders () {
    let headers = {
      "Content-Type": "application/json"
    }
    if (this.isAuthentificated()) {
      headers['Authorization'] = 'Token ' + this.state.token
    }
    return headers
  }

  pullData () {
    const headers = this.getHeaders();
    const fetcher = (url, key, result=[]) => {
      axios.get(url, {'headers': headers}).then(response => {
        result.push(...response.data.results);
        if (!response.data.next) {
          this.setState({[key]: result});
          return;
        }
        fetcher(response.data.next, key, result);
      }).catch(() => {
        this.setState({[key]: []});
      });
    }

    const _pullData = (url) => {
      const key = url.split('/').pop();
      fetcher(url, key);
    }

    this.state.api.forEach(url => {
      _pullData(url);
    })
  }

  componentDidMount() {
    this.restoreToken();
  }

  render() {
    return (
      <div className="sub_body">
        <div className="top">
          <BrowserRouter>
            <Header isAuthentificated={() => {this.isAuthentificated()}} saveToken={() => {this.saveToken()}}/>
              <Routes>
                <Route path='/' element={<Home isAuthentificated={() => {this.isAuthentificated()}}/>} />
                  <Route path='login' element={<LoginForm getToken={(username, password) => this.getToken(username, password)}/>} />
                  <Route path='projects' element={<ProjectList projects={this.state.projects}/>} />
                    <Route path='projects/:id' element={<ProjectDetail projects={this.state.projects}/>} />
                  <Route path='todo' element={<ToDoList toDoTasks={this.state.todo}
                    projects={this.state.projects} users={this.state.users}/>} />
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