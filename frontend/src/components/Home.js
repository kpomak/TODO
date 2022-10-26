import React, {Component} from 'react';


class Home extends Component { 
  constructor(props) {
    super(props)
    this.auth = this.props.isAuthentificated
  }

  render() {
    return (
      <div className="container-xxl">
        <div className="d-flex align-items-center flex-column">
          {console.log(this.auth, this.auth())}
          <h1>Hello, {this.auth() ? 'user' : 'stranger'}!</h1>
          <h2>Welcome to ToDo task list!</h2>
        </div>
      </div>
    );
  }
}

export default Home;