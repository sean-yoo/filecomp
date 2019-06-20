import React, { Component } from 'react';
import './App.css';
import Compress from './components/Compress/Compress';
import Decompress from './components/Decompress/Decompress';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
		}
  }

  
  render () {
    return (
      <div className="App">
        <Compress/>
        {/* <Decompress/> */}
      </div>
    );
  }
}


export default App;
