import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Header from '../WalletScreen/Header'

export default class TypeScreen extends Component {
  render() {
    return (
      <View>
        <Header
        name="Quản lý loại"
        />
        <Text> textInComponent </Text>
      </View>
    )
  }
}