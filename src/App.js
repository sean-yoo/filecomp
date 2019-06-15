import React, { Component } from 'react';
import './App.css';
import Compress from './components/Compress/Compress';
import Decompress from './components/Decompress/Decompress';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
			input: 'NA',
			byteArray: []
		}
  }

  onInputChange1 = (e) => {
    var files = e.target.files;
    this.setState({input: files}, function () {});
	}

	onButtonSubmit1 = () => {
    if (this.state.input !== 'NA') {
      var r = new FileReader();
      r.onload = function(){ alert(r.result); };
      r.readAsBinaryString(this.state.input[0]);
      console.log('hello');
    }
	}
  
  render () {
    return (
      <div className="App">
        <Compress
          onInputChange1={this.onInputChange1}
          onButtonSubmit1={this.onButtonSubmit1}
        />
        {/* <Decompress/> */}
      </div>
    );
  }
}


export default App;
