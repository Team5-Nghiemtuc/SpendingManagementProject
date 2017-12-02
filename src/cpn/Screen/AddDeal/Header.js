import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import Color from '../../Style/Color'
import Style from '../../Style/Styles'

export default class Header extends Component {
    goBack() {
        this.props.navigation.goBack();
    }
    render() {
        const {
            text
        } = styles;
        return (
        <View style={Style.wapper}>
         <Icon.Button 
          name ='chevron-thin-left'
          size={30}
          color={Color.textHeader}
          backgroundColor={Color.header}
          onPress={this.goBack.bind(this)}
        />
        <Text
         style={text}
        >Thêm Giao Dịch</Text>
        <Icon.Button 
          name ='check'
          size={30}
          color={Color.textHeader}
          backgroundColor={Color.header}
          onPress={this.props.check}
        />
        </View>
    )
  }
}

const styles = StyleSheet.create({
    text:{
        fontSize: 22,
        fontWeight:'bold',
        color: Color.textHeader
    }
})