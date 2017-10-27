import React, { Component } from 'react'
import { 
    Text, 
    View, 
    StyleSheet,
    Dimensions
} from 'react-native'
import Header from './Header/Header'

const { height, width } = Dimensions.get('window');

export default class MainScreen extends Component {
  render() {
    const {
        header
    } = styles;
    return (
      <View >
          <Header style= {header}/>
        <Text > MainScreenComponent </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    header:{
        flex: 1
    }
})