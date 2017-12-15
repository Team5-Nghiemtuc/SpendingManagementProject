import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from './Header'
import TypeList from './TypeList'

export default class TypeScreen extends Component {
  render() {
    return (
      <View>
        <Header
        name="Quản lý loại"
        navigation={this.props.navigation}
        />
        <TypeList style={{height:'100%',backgroundColor:'red'}}/>
      </View>
    )
  }
}