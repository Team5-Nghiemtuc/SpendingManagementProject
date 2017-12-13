import React, { Component } from 'react'
import { Text, View, StyleSheet, Dimensions, DatePickerAndroid } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import { connect } from 'react-redux'
import Color from '../../Style/Color'

const {width, height} = Dimensions.get('window');


class MenuSelect extends Component {
    async PickADate(){
        try{
          const {action,year, month, day } = await DatePickerAndroid.open({
            date: new Date()
          });
          if(action!= DatePickerAndroid.dismissedAction){
            const action = {
              type: 'PICK_A_DATE',
              day: new Date(year,month,day)
            }
            this.props.dispatch(action)        
          }
        }catch(e){
          console.log(e);
          const action = {
            type: 'PICK_A_DATE',
            day: new Date()
          }
          this.props.dispatch(action)
        }
      }
      render() {
        return (
          <View style={style.Wapper}>
            <View style={style.Avatar}>
            <Avatar
             large
             icon={{name: 'account-circle'}}
             rounded
             />
             </View>
            <Button
            small
            title='Đăng ký' 
            borderRadius={30}
            buttonStyle={style.Button}
            color={Color.header}        
            />
            <Button
            small
            title='Danh sách loại' 
            borderRadius={30}
            buttonStyle={style.Button}
            color={Color.header}
            />
            <Button
            small
            title='Đổi ngày' 
            borderRadius={30}
            buttonStyle={style.Button}
            color={Color.header}     
            onPress={this.PickADate.bind(this)}   
            />
          </View>
        )
      }
    
}

const style = StyleSheet.create({
    Wapper:{
      backgroundColor: Color.header,
      height: height
    },
    Avatar:{
      marginTop: height/5,
      alignSelf: 'center'
    },
    Button: {
      marginTop: 10,
      marginBottom: 10,
      width: '80%',
      alignSelf: 'center',
      backgroundColor: Color.textHeader
    }
  })

  export default connect()(MenuSelect);