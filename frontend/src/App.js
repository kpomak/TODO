import request from 'request';
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


class App extends Component {
  constructor(props) {
    super(props)
    const apiPath = 'http://localhost:8000/api/'
    this.state = {
      'users': [],
      'projects': [],
      'todo': [],
      'api': [
        apiPath + 'users',
        apiPath + 'projects',
        apiPath + 'todo',
      ]
    }
  }

  pullData(url) {   
    let result = [];
    const key = url.split('/').pop();

    const _request = (url) => {
      request(url, (error, response, body) => {
        _pullData(body);
      });
    }

    const _pullData = function (body) {
      const parsedData = JSON.parse(body);
      result.push(...parsedData.results);
      if (!parsedData.next)
        return;
      _request(parsedData.next);
    }

    _request(url);
    this.setState(
      { [key]: result }
    )
  }

  componentDidMount() {
    this.state.api.forEach(url => {
      this.pullData(url);
    });
  }

  render() {
    return (
      <div className="sub_body">
        <div className="top">
          <BrowserRouter>
            <Header />
              <Routes>
                <Route path='/' element={<Home/>} />
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