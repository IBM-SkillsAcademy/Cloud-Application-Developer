import React, { Component } from 'react';
import Record from './Record';

export default class Result extends Component {
  renderResults() {
    if (this.props.tones.length === 0) {
      return 'No tones detected';
    }
    return this.props.tones.map(classification => {
      const key = classification.tone_id;
      return <Record classification={classification} key={key}/>;
    });
  }

  render() {
    return (
    <div className='form-block'>
      <div className="row">
        <div className="col">
          <h2>Text</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {this.props.text}
        </div>
      </div>
      <div className="row">
        <div className="col">
          <h2>Tones</h2>
        </div>
      </div>
      <div className="row">
        <div className="col">
          {this.renderResults()}
        </div>
      </div>
    </div>
  );
  }
}
