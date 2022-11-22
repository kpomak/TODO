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
import CreateProject from './components/CreateProjectForm';
import CreateTodo from './components/CreateTodo';
import EditProject from './components/EditProject';


class App extends Component {
  constructor(props) {
    super(props)
    this.serverPath = "http://localhost:8000/"
    this.apiPath = this.serverPath + "api/"
    this.state = {
      'users': [],
      'projects': [],
      'todo': [],
      'token': '',
      'user': {},
      'username': '',
      'api': [
        this.apiPath + 'users/',
        this.apiPath + 'projects/',
        this.apiPath + 'todo/',
      ]
    }
  }

  getToken (username, password) {
    axios.post(this.serverPath + 'api-token-auth/', {'username':username, 'password': password})
      .then(response => {
        this.saveToken(response.data['token'], username)})
      .catch(error => alert('Wrong value of username or password'));
  }

  setUser(key) {
    if (key !== 'users') return;
    this.setState({'user': this.state.users.find(user => {
      return (user.username === this.state.username)
        ? user
        : null})
    });
  }

  saveToken (token, username='') {
    const cookie = new Cookies();
    cookie.set('token', token);
    cookie.set('username', username);
    cookie.set('SameSite', 'Lax');
    this.setState({'token': token, 'username': username}, () => this.pullData());
  }

  isAuthentificated() {
    return !!this.state.token;
  }

  restoreToken () {
    const cookie = new Cookies();
    const token = cookie.get('token');
    const username = cookie.get('username');
    this.setState({'token': token, 'username': username}, () => this.pullData());
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
          this.setState({[key]: result}, () => {
            this.setUser(key);
          });
          return;
        }
        fetcher(response.data.next, key, result);
      }).catch(() => {
        this.setState({[key]: [], 'user': {}});
      });
    }

    const _pullData = (url) => {
      const key = url.slice(0, -1).split('/').pop();
      fetcher(url, key);
    }

    this.state.api.forEach(url => {
      _pullData(url);
    })
  }

  createItem(url, data) {
    const headers = this.getHeaders();
    axios.post(this.apiPath + url, data, {'headers': headers}).then(response => {
      alert('Successfully created');
      this.pullData();
    }).catch(error => console.log('Something goes wrong', error));
  }

  searchItem(itemName) {
    if (itemName === '') {
      this.pullData();
      return;
    }
    const searchedProjects = this.state.projects.filter(project => {
      return project.projectName.toLowerCase().includes(itemName.toLowerCase())
    });
    this.setState({'projects': searchedProjects});
  }

  updateItem(path, id, data) {
    const headers = this.getHeaders();
    axios.put(this.apiPath + `${path}/${id}/`, data, {'headers': headers})
      .then(response => {
        this.pullData()
      }).catch(error => console.log(error));
  }

  deleteItem(path, id) {
    const headers = this.getHeaders();
    axios.delete(this.apiPath + `${path}/${id}/`, {'headers': headers})
      .then(response => {
        this.pullData()
      }).catch(error => console.log(error));
  }

  componentDidMount() {
    this.restoreToken();
  }

  render() {
    return (
      <div className="sub_body">
        <div className="top">
          <BrowserRouter>
            <Header isAuthentificated={() => this.isAuthentificated()} saveToken={() => {this.saveToken('')}} user={this.state.user} searchItem={(itemName) => {this.searchItem(itemName)}}/>
              <Routes>
                <Route path='/' element={<Home isAuthentificated={() => this.isAuthentificated()}/>} />
                  <Route path='login' element={<LoginForm getToken={(username, password) => this.getToken(username, password)}/>} />
                  <Route path='projects' element={<ProjectList projects={this.state.projects} deleteItem={(item, id) => this.deleteItem(item, id) }/>} />
                    <Route path='projects/:id' element={<ProjectDetail projects={this.state.projects} setProject={(project) => this.setProject(project)}/>} />
                    <Route path='projects/:id/edit' element={<EditProject projects={this.state.projects} users={this.state.users} updateProject={(path, id, data) => this.updateItem(path, id, data)}/>} />
                    <Route path='projects/create' element={<CreateProject users={this.state.users} createProject={(url, data) => this.createItem(url, data)}/>} />
                  <Route path='todo' element={<ToDoList toDoTasks={this.state.todo}
                    projects={this.state.projects} users={this.state.users} deleteItem={(item, id) => this.deleteItem(item, id)} />} />
                    <Route path='todo/create' element={<CreateTodo projects={this.state.projects} user={this.state.user} createTodo={(url, data) => this.createItem(url,data)}/>}/>
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