import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './student';
//import Toggle from '../multi-toggle/toggle';


const rootEl = document.getElementById('app');
const render = Component => {
  ReactDOM.render(

    <div>
      <Tree />
    </div>,
    rootEl
  );
};

render(require('./student').default);
if (module.hot)
  module.hot.accept('./student', () => render(require('./student').default));
