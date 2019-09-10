import React from 'react';
import { Root } from 'native-base'
import Navigation from './config/router'
import {Provider} from 'react-redux'
import {store} from './redux/index'
class  App extends React.Component {
  render(){

    return (
      // <Provider store={store}>
      <Root>
        <Navigation />
      </Root>
      // </Provider>
  );
}
}

export default App;
