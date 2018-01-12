import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput } from 'react-native'
import Modal from 'react-native-modalbox'
import { Divider, Button } from 'react-native-elements'
import Color from '../../../Style/Color';
import {KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class InputModal extends Component {
    constructor(props){
        super(props)
        this.state={
            value: 0,
            check: false
        }
    }
    open() {
        this.refs.myModal.open()
    }
    close() {
        this.refs.myModal.close()
    }
    done (){
        this.props.parent.setTarget(this.state.value)
        this.refs.myModal.close()
    }
    render() {
    const {
        Wapper, ButtonStyle, Container, TextS, Input,ButtonStyle2
    } = style
    const check = this.state.check ?
    <Text
    style={{
        color: '#f74f4f',
        marginLeft:3
      }}
    >Bạn đã nhập kí tự đặc biệt, vui lòng nhập lại</Text> : <Text></Text>
    return (
      <Modal 
      animationType='fade'
      ref={'myModal'}
      backDrop={false}
      style={Wapper}
      >
      
      <KeyboardAwareScrollView
                scrollEnabled={false}
                enableOnAndroid={true}
      >
        <Text
        style={TextS}
        > Nhập hạn mức </Text>
        <Divider />
        {check}
        <TextInput
        underlineColorAndroid='transparent'
        style={Input}
        placeholder='Hạn mức'
        keyboardType='phone-pad'
        onChangeText={text=>{
            this.setState({
                value: parseInt(text),
                check: isNaN(text)
            })
        }}
        />
        <View
        style={{flexDirection:'row',alignSelf:'flex-end',justifyContent:'space-around',}}
        >
        <Button
        title='Thoát'
        buttonStyle={ButtonStyle2}
        containerViewStyle={Container}
        color='black'
        onPress={this.close.bind(this)}
        />
        <Button
        title='Xong'
        buttonStyle={ButtonStyle}
        containerViewStyle={Container}
        onPress={this.done.bind(this)}
        />
        </View>
      </KeyboardAwareScrollView>
      </Modal>
    )
  }
}

const style = StyleSheet.create({
    Wapper:{
        width:'80%',
        height: '35%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#757578',
    },
    ButtonStyle:{
        backgroundColor: Color.header,
        borderRadius: 10,
        height:'100%'
    },
    ButtonStyle2:{
        backgroundColor: Color.textHeader,
        borderRadius: 10,
        height:'100%',
        borderWidth:1,
        borderColor:'#1E1E1E'
    },
    Container:{
        width:'25%',
        height:'50%',
        // alignSelf: 'center'
    },
    TextS:{
        fontSize: 20,
        color: 'black'
    },
    Input:{
        borderWidth:1,
        marginVertical:10,
        marginHorizontal:10,
        borderRadius: 10,
        borderColor: Color.header
    }
})
