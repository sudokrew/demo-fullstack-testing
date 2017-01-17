import React, { PropTypes } from 'react';
import $ from 'jquery';

import styles from './BuyAdForm.css';

class BuyAdForm extends React.Component {
  constructor (props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    const { min, max } = props;
    this.validateDescriptionLength = this.validateDescriptionLength({ min, max }).bind(this);
    this.state = {
      errors: [],
    };
  }

  validateDescriptionLength (_options = {}) {
    const options = {};
    options.min = (_options.min >= 0) ? _options.min : 0;
    options.max = (_options.max < Infinity) ? _options.max : Infinity;
    const { min, max } = options;
    return function (event) {
      const { value } = event.target;
      return min <= value.length && value.length <= max;
    }
  }

  handleSubmit (event) {
    event.preventDefault();
    const form = event.target;

    const data = $(form).serialize();

    $.ajax('/api/ads', {
      method: 'POST',
      data,
      dataType : 'json',
    })
    .catch((res) => {
      return this.setState({ errors: [].concat(res.responseJSON) });
    });
  }

  render (props) {
    const errorSpans = this.state.errors.map(({ error }, index) => (
      <span
        className="error"
        key={index}
      >
        { error }
      </span>
    ));

    return (
      <form
        method="POST"
        action="/api/ads"
        onSubmit={this.handleSubmit}
      >
        { errorSpans }
        <textarea
          name="description"
          rows="8"
          cols="80"
          onChange={this.validateDescriptionLength}
        ></textarea>
        <button
          type="submit"
        >
          Buy
        </button>
      </form>
    );
  }
}

export default BuyAdForm;
