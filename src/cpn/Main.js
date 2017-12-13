import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Provider, connect } from 'react-redux'
import {addNavigationHelpers} from 'react-navigation'
import Drawer from './Router';
import store from './Reducer/store';


class MainApp extends Component {
  render(){
    return(
      <Drawer
      navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
      })}
      />
    )
  }
}

const mapStateToProps = (state) => ({
    nav: state.nav
})

const AppWithNavigation = connect(mapStateToProps)(MainApp)



export default class Main extends Component {
  render() {
    return (
      <Provider store={store} >
        <AppWithNavigation />
      </Provider>
    )
  }
}