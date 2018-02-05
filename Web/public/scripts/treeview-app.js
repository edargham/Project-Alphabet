import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './tree';
import ModalForm from './formshow/modal/modal'


const rootEl = document.getElementById('app');
const render = Component => {
  ReactDOM.render(

    <div>
      <Tree />
    </div>,
    rootEl
  );
};

render(require('./tree').default);
if (module.hot)
  module.hot.accept('./tree', () => render(require('./tree').default));

