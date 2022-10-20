import request from 'request';
import React, { Component } from 'react';
import { HashRouter, Routes, Route} from 'react-router-dom';
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
          <HashRouter>
            <Header />
              <Routes>
                <Route path='/' element={<UsersList users={this.state.users}/>} />
                {/* <Route exact path='/' component={() => <AuthorListitems={this.state.authors} />} /> */}
                {/* <Route exact path='/books' component={() => <BookListitems={this.state.books} />} /> */}
                {/* <Route path="/author/:id"><AuthorBookList items={this.state.books} /></Route> */}
                {/* <Redirect from='/authors' to='/' /> */}
                <Route path='*' element={<NotFound404 />} />
              </Routes>
          </HashRouter>
        </div>
        <div className="footer bg-light">
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;