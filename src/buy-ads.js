import React from 'react'
import ReactDOM from 'react-dom';
import {
  BuyAdForm,
  Modal,
} from './components';

const modal = ReactDOM.render(
  <Modal />,
  document.getElementById('modal')
);

ReactDOM.render(
  <BuyAdForm
    min={25}
    max={140}
    onSuccess={() => {
      modal.setState({ show: true });
    }}
  />,
  document.querySelector('#buy-ad-form')
);
