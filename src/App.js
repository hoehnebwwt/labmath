import React, { Component } from 'react';
import './App.css';
import Simple from './simple';
import Pharmacy from './pharmacy';

class App extends Component {
  state = {
    activeTab: 'iv'
  }

  handleTabChange = (tab) => {
    this.setState({ activeTab: tab })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Lab Math Calculator</h1>
          <div className="tab-navigation">
            <button 
              className={`tab-button ${this.state.activeTab === 'iv' ? 'active' : ''}`}
              onClick={() => this.handleTabChange('iv')}
            >
              Pediatric IV Fluid
            </button>
            <button 
              className={`tab-button ${this.state.activeTab === 'pharmacy' ? 'active' : ''}`}
              onClick={() => this.handleTabChange('pharmacy')}
            >
              Pharmacy Formulas
            </button>
          </div>
        </header>
        <div className="App-intro">
          {this.state.activeTab === 'iv' && <Simple />}
          {this.state.activeTab === 'pharmacy' && <Pharmacy />}
        </div>
      </div>
    );
  }
}

export default App;
