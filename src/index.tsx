import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routing from './routing';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import './App/Styles.css';
import './App/Components/Styles.css';

ReactDOM.render(
  <Routing />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
