import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Routing from './routing';
import { unregister } from './registerServiceWorker';
import './styles.css';
import 'draft-js/dist/Draft.css';
import 'react-simplemde-editor/dist/simplemde.min.css';

ReactDOM.render(
  <Routing />,
  document.getElementById('root') as HTMLElement
);

// Disable service worker
unregister();
// registerServiceWorker();
