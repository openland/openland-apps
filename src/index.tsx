import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routing from './routing';
import { unregister } from './registerServiceWorker';
import './styles.css';

ReactDOM.render(
  <Routing />,
  document.getElementById('root') as HTMLElement
);

// Disable service worker
unregister();
// registerServiceWorker();
