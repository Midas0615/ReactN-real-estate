import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/store'
import Application from './src/components/Application';

export default class RealEstate extends Component {
  render() {    
    return (
      <Provider store={store}>
        <Application />
      </Provider>
    );
  }
}

AppRegistry.registerComponent('RealEstate', () => RealEstate);