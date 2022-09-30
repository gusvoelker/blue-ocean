import './App.css'

import React from 'react'
import axios from 'axios';

import ClassComponent from './components/ClassComponent.jsx';
import FuncComponent from './components/FuncComponent.jsx';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
    this.getResults = this.getResults.bind(this);
  }

  getResults() {
    return axios.get('/example')
      .then((response) => {
        let results = response.data;
        this.setState({results});
      })
      .catch((error) => console.log(error));
  }

  onComponentMount() {
    this.getResults();
  }

  render() {
    return (
      <div className="App">
        <ClassComponent
          myProp={'class(y) component'}
        />
        <FuncComponent
          myProp={'FUNctional component'}
        />
      </div>
    );
  }

}
