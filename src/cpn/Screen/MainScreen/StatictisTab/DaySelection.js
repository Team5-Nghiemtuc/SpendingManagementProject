import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, DatePickerAndroid, TouchableOpacity } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import Colors from '../../../Style/Color'
import Func from '../../../../Classes/Function'

const { height, width } = Dimensions.get('window')

export default class DaySelection extends Component {

  Pick1stDate() {
    this.props.parent.PickADate(1)
  }
  Pick2ndDate() {
    this.props.parent.PickADate(2)
  }
  Update(){
    this.props.parent.Update()
  }
  render() {
    const {
      firstDay, secondDay, parent
    } = this.props
    const {
      wapper, buttonStyle, iconStyle, button
    } = style

    return (
      <View style={wapper}>
        <TouchableOpacity
          style={buttonStyle}
          onPress={this.Pick1stDate.bind(this)}
        >
          <Text
            style={{
              color: 'black'
            }}
          >{`${Func.DateConvert(firstDay)}`}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={buttonStyle}
          onPress={this.Pick2ndDate.bind(this)}
        >
          <Text
            style={{
              color: 'black'
            }}
          >{`${Func.DateConvert(secondDay)}`}</Text>
        </TouchableOpacity>
        <Icon
          type='entypo'
          name='triangle-right'
          containerStyle={iconStyle}
          onPress={this.Update.bind(this)}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  wapper: {
    flexDirection: 'row',
    width: width,
    justifyContent: 'space-between'
  },
  buttonStyle: {
    backgroundColor: Colors.textHeader,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C5C5C5',
    width: (width - 50) / 2,
    height: height * 0.05,
    justifyContent: 'space-around'
  },
  iconStyle: {
    width: 50,
    borderWidth: 1,
    borderColor: '#C5C5C5',
    backgroundColor: Colors.textHeader,
    height: height * 0.05
  },
  button: {
    backgroundColor: Color.textHeader,
    borderWidth: 1,
    borderColor: '#C5C5C5',
  }
})
