import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      counter: 0,
      errorMessageIsHidden: true
    };
  }

  increaseCounter() {
    this.setState({ errorMessageIsHidden: true })
    this.setState({ counter: this.state.counter + 1 })
  }

  decreaseCounter () {
    if (this.state.counter === 0) {
      this.setState({ errorMessageIsHidden: false })
    } else {
      this.setState({ counter: this.state.counter - 1 })
    }
  }

  render() {

    return (
      <div data-test="component-app">
        <h1 data-test="counter-display">The counter is currently {this.state.counter}</h1>
        {!this.state.errorMessageIsHidden && <ErrorMessage />}
        <button
          data-test="increment-button"
          onClick={this.increaseCounter.bind(this)}
          >
          Increment counter
        </button>
        <button
          data-test="decrement-button"
          onClick={this.decreaseCounter.bind(this)}
        >
          Decrement counter
        </button>
      </div>
    );
  }
}

const ErrorMessage = () => (
  <div
    data-test="error-message"
    className="errorMessage">
    You cannot decrease the counter below 0.
  </div>
)

export default App;
