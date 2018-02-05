import React from 'react';
import ReactDOM from 'react-dom';
import Tree from './tree';
import ModalForm from './formshow/modal/modal'
import { AppContainer } from 'react-hot-loader';

const rootEl = document.getElementById('app');
const render = Component => {
  ReactDOM.render(
    /*<AppContainer>
      <Component />
            <Tree pollInterval = {2000}/>
    </AppContainer>,*/
    <div>

      <Tree />
    </div>,
    rootEl
  );
};

render(require('./tree').default);
if (module.hot)
  module.hot.accept('./tree', () => render(require('./tree').default));


//var el = document.getElementById("app");
//if(el)
  //  ReactDOM.render(<Tree />, el);