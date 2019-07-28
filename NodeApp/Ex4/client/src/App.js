import React, { Component } from 'react';
import './App.css';
import Result from './Result';

export default class App extends Component {
  baseUri = 'http://localhost:5001';

  constructor() {
    super();
  
    this.state = {
      text: 'Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation...',
      tones: []
    };

    this.getTones = this.getTones.bind(this);
    this.updateText = this.updateText.bind(this);
  }

  componentDidMount() {
    document.body.style.background = '#cafafe';
    document.getElementById('text-input').value = this.state.text;
    this.getTones();
  }

  updateText(e) {
    this.setState({
      text: e.target.value
    });
  }

  async getTones() {
    try {
      const response = await fetch(`${this.baseUri}/tone?text=${this.state.text}`);
      const toneResponse = await response.json();
  
      this.setState({
        tones: toneResponse.document_tone.tones
      });
    } catch (error) {
      this.setState({
        tones: []
      });
    }
  }

  render() {
    return (
      <div className="container">
        <h1>Tone Analyser</h1>
        <div>
          <div className="form-group">
            <textarea className="form-control" id="text-input" placeholder="Enter text here" onChange={this.updateText}></textarea>
          </div>
          <button className="btn btn-info" onClick={this.getTones}>Retrieve Tones</button>
        </div>
        <Result text={this.state.text} tones={this.state.tones}/>
      </div>
    );
  }
}
