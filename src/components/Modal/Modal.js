import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';

import styles from './Modal.css';

var cx = classNames.bind(styles);

class Modal extends React.Component {
  constructor () {
    super();
    this.state = {
      show: false,
    };
  }

  setVisibility (show) {
    this.setState({ show });
  }

  render () {
    return (
      <div
        className={cx({ hidden: !this.state.show })}
      >
        <div
          className={styles.modal}
        >
          Success
        </div>
      </div>
    );
  }
};

export default Modal;
