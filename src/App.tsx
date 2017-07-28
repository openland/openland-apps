import * as React from 'react';
import Counter from './Indicators/Counter'
import Root from './App/Root'

//
// Styles
//

import 'antd/dist/antd.css'
import './App/Styles.css';
import './Indicators/Styles.css';

// Root of the App
class App extends React.Component<{}, {}> {
  render() {
    return (
      <Root>
        <div className="App-header">
          <Counter name="123" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </Root>
    );
  }
}

export default App;