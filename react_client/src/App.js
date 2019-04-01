import React, { Component } from 'react';
import './style/main.css';
import Main from './components/main';

class App extends Component {
  render() {
    return (
      <div className='main-cont'>
          <Main/>
      </div>
    );
  }
}

export default App;
