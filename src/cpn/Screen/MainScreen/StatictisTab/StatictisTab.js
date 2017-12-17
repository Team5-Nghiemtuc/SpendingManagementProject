import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class StatictisTab extends Component {
    static navigationOptions = {
        tabBarLabel: 'Thống kê',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='assessment'
                color={tintColor}
                size={32}
            />
        ),
    };
  render() {
    return (
      <Temp />
    )
  }
}

class Temp extends Component {
  componentWillMount(){
    console.log('Temp')
  }
  render() {
    return (
      <View>
        <Text> StatictisTab </Text>
      </View>
    )
  }
}