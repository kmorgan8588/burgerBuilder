import React, { Component } from 'react';
import './App.css';
import Layout from './components/Layout/Layout'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>
      <Layout>
        <p>Test</p>
      </Layout>
    </div>);
  }
}

export default App;
