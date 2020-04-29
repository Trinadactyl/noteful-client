import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false
    };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
    }
  
  render() {
    if(this.state.error) {
      return (
      <main>
        <h1>Oh no! Something went wrong!</h1>
        <p>Try again.</p>
      </main>
      )
    }
    return this.props.children
  }
}