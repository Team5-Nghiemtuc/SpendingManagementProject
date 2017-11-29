import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider } from 'react-redux'
import Drawer from './Router';
import store from './reducer';

export default class Main extends Component {
  render() {
    return (
      <Provider store={store} >
        <Drawer />
      </Provider>
    )
  }
}