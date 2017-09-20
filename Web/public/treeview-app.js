import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './treeview-test.js';
import { AppContainer } from 'react-hot-loader';

const rootEl = document.getElementById('app');
const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    rootEl
  );
};

render(require('./treeview-test').default);
if (module.hot)
  module.hot.accept('./treeview-test', () => render(require('./treeview-test').default));


//var el = document.getElementById("app");
//if(el)
  //  ReactDOM.render(<Tree />, el);