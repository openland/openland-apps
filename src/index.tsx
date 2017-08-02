import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routing from './App/Routing';
import registerServiceWorker from './registerServiceWorker';

import 'antd/dist/antd.css';
import './index.css';
import './App/Styles.css';
import './Indicators/Styles.css';
import './Components/Styles.css';

ReactDOM.render(
  <Routing />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
