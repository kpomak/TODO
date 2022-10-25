import React, {Component} from 'react';


class Home extends Component { 

  render() {
    return (
      <div className="container-xxl">
        <div className="d-flex align-items-center flex-column">
          <h1>Hello, {(this.props.isAuthentificated()) ? 'user' : 'stranger'}!</h1>
          <h2>Welcome to ToDo task list!</h2>
        </div>
      </div>
    );
  }
}

export default Home;