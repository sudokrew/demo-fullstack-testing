import React from 'react'
import ReactDOM from 'react-dom';
import {
  BuyAdForm,
  Modal,
} from './components';

ReactDOM.render(
  <Modal />,
  document.getElementById('modal')
);

ReactDOM.render(
  <BuyAdForm
    min={25}
    max={140}
  />,
  document.querySelector('#buy-ad-form')
);
