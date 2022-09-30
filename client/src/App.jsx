import React from 'react'
import axios from 'axios';

import { serverURL } from './config.example.js';
import NavBar from './components/NavBar/NavBar.jsx';


export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
    this.getResults = this.getResults.bind(this);
  }

  getResults() {
    return axios.get(`${serverURL}/example`)
      .then((response) => {
        let results = response.data;
        this.setState({results});
      })
      .catch((error) => console.log(error));
  }

  componentDidMount() {
    this.getResults();
  }

  render() {
    return (
      <div className="App">
        <NavBar/>
      </div>
    );
  }

}
