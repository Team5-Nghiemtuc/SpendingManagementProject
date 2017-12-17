import React, { Component } from 'react'
import { Text, View, Dimensions, TouchableOpacity, StyleSheet } from 'react-native'
import Header from './Header'
import TypeList from './TypeList'
import { Button } from 'react-native-elements';
import Color from '../../Style/Color'
const { height, width } = Dimensions.get('window')

export default class TypeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: true
    }
  }
  render() {
    return (
      <View>
        <Header
          name="Quản lý loại"
          navigation={this.props.navigation}
          style={{ flex: 1 }}
        />
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={style.button}
            onPress={() => { this.setState({ selected: !this.state.selected }) }}
          >
            <Text
              style={this.state.selected ? style.text : style.selecteText}
            >Chi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button}
            onPress={() => { this.setState({ selected: !this.state.selected }) }}

          >
            <Text
              style={this.state.selected ? style.selecteText : style.text}
            >Thu</Text>
          </TouchableOpacity>
        </View>
        <TypeList 
        select={this.state.selected}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  button: {
    width: width / 2, height: height * 0.05, alignItems: 'center', justifyContent: 'space-around',
    borderWidth: 2,
    borderColor: '#D5D5D7',
    backgroundColor: Color.textHeader
  },
  text: {
    color: Color.header
  }
  ,
  selecteText: {
    color: Color.unactive
  }
})