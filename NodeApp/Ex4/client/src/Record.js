import React, { Component } from 'react';

export default class Record extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tone: props.classification.tone_name,
      score: (props.classification.score * 100).toFixed(2)
    };
  }

  getColor(score) {
    if (score > 75) {
      return 'green';
    } else if(score > 50){
      return 'orange';
    } else {
      return 'red';
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col">
          {this.state.tone}
          <div className="progress">
            <div className="progress-bar" style={{width: `${this.state.score}%`, backgroundColor: this.getColor(this.state.score)}}>{this.state.score}</div>
          </div>   
        </div>
      </div>
    );
  }
}