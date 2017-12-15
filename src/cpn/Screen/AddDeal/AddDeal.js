import React, { Component } from 'react'
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  TouchableHighlight,
  Modal,
  TouchableOpacity,
  Alert,
  DatePickerAndroid
} from 'react-native'
import Color from '../../Style/Color'
import Header from './Header'
import { Icon, Divider } from 'react-native-elements'
import SelectList from './SelectList.'
import Service from '../../../Classes/Service'
import Function from '../../../Classes/Function'
import Deal from '../../../Classes/Deal'

const { heigth, width } = Dimensions.get('window');

export default class AddDeal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Amount: 0,
      checkNumber: false,
      Note: '',
      selectedType: { ID: '', Name: 'Loại' },
      selectedWallet: { ID: '', Name: 'Ví' },
      date: new Date()
    }
  }
  async pickDate(){
    try{
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: new Date()
      })
      if(action!==DatePickerAndroid.dismissedAction){
        this.setState({
          date: new Date(year,month,day)
        })
      }
    }catch({code,message}){
      Alert.alert(
        'Không thể mở bảng chọn ngày',
        message
      )
    }
  }
  openModalType() {
    this.refs.TypeList.open();
  }
  openModalWallet() {
    this.refs.WalletList.open();
  }
  componentWillMount() {
    let save = Service.get();
    if(save){
      let wallet = Service.findWallet(save.ID_wallet)
      if(wallet){
        this.setState({
          selectedWallet: wallet
        })
      }
    }
  }
  addNewDeal(){
    let save = Service.get();
    if(this.state.selectedWallet.ID===''){
      Alert.alert(
        'Chưa có ví',
        'Hãy thêm ví mới để sử dụng'
      )
      return;
    }
      if(this.state.selectedType.ID===''){
        Alert.alert(
          'Chưa chọn loại',
        )
        return;
      }
      if(this.state.Amount===0 || isNaN(this.state.Amount)){
        Alert.alert(
          'Số tiền không đúng định dạng',
        )
        return;
      }
      let id=  Function.idDeal(save.DealSize);
      Service.addDeal(new Deal(
        id,
        '0',
        this.state.selectedWallet.ID,
        this.state.selectedType.ID,
        this.state.Amount,
        this.state.date,
        this.state.Note
      ))
      Service.incDealSize();
      let w = this.state.selectedWallet;
      Service.changeWallet(w.ID,w.Amount-this.state.Amount);
      this.props.navigation.navigate('Main');
    }
  render() {
    const {
      container,
      moneyInput,
      input,
      inputarlet,
      TypeAndWallet,
      noteInput,
      Wapper,
      TextS
    } = style
    let noti = this.state.checkNumber ?
      <Text style={{
        color: '#f74f4f',
        fontSize: 10
      }}
      >Bạn đã nhập kí tự đặc biệt, vui lòng nhập lại</Text> :
      <Text></Text>
    return (
      <View style={{ height: '100%' }}>
        <Header
          navigation={this.props.navigation}
          check={this.addNewDeal.bind(this)}
        />
        <View
          style={container}
        >
         {noti}
          <View
            style={moneyInput}
          >
            <Icon
              raised
              type='font-awesome'
              name='money'
              color={Color.header}
            />
            <TextInput
              placeholder="Số tiền"
              onChangeText={(text) => {
                this.setState({
                  Amount: parseInt(text),
                  checkNumber: isNaN(text)
                })
              }
              }
              style={input}
              keyboardType='phone-pad'
              underlineColorAndroid='transparent'
            />
          </View>
         
          <View
            style={TypeAndWallet}
          >
            <Divider />
            <TouchableOpacity
              onPress={this.openModalType.bind(this)}
            >
              <View style={Wapper}>
                <Icon
                  name='circle'
                  type='entypo'
                  raised
                  font={20}
                  color={Color.header}
                />
                <Text
                  style={TextS}
                >{this.state.selectedType.Name}</Text>
                <Icon
                  name='keyboard-arrow-right'
                />
              </View>
            </TouchableOpacity>

            <Divider />
            <TouchableOpacity
              onPress={this.openModalWallet.bind(this)}
              style={Wapper}
            >
              <Icon
                name='wallet'
                type='entypo'
                raised
                font={20}
                color={Color.header}
              />
              <Text
                style={TextS}
              > {this.state.selectedWallet.Name} </Text>
              <Icon
                name='keyboard-arrow-right'
              />
            </TouchableOpacity>
            <Divider />
            <TouchableOpacity
              onPress={this.pickDate.bind(this)}
              style={Wapper}
            >
              <Icon
                name='calendar'
                type='entypo'
                raised
                font={20}
                color={Color.header}
              />
              <Text
                style={TextS}
              > Chọn ngày </Text>
              <Icon
                name='keyboard-arrow-right'
              />
            </TouchableOpacity>
            <Divider />
          </View>
          <TextInput
            maxLength={256}
            multiline={true}
            placeholder="Ghi chú"
            style={noteInput}
            underlineColorAndroid='transparent'
            numberOfLines={4}
            onChangeText={(text) => {
              this.setState({
                Note: text
              })
            }}
          />
        </View>
        <SelectList
          ref={'TypeList'}
          data={Service.getAllType()}
          Select={(value) => {
            this.setState({
              selectedType: value
            })
            this.refs.TypeList.select();
          }}
        />
        <SelectList
          ref={'WalletList'}
          data={Service.getAllWallet()}
          Select={(value) => {
            this.setState({
              selectedWallet: value
            })
            this.refs.WalletList.select();
          }}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: Color.addDeal,
    alignItems: 'center'
  },
  moneyInput: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    width: width * 60 / 100,
    marginLeft: width * 10 / 100,
    fontSize: 20,
  },
  TypeAndWallet: {
    justifyContent: 'space-around',
    width: width
  },
  TextS: {
    textAlign: 'left',
    fontSize: 20,
    margin: 10,
    width: width * 50 / 100,
    marginLeft: width * 11 / 100,
  },
  noteInput: {
    width: width * 0.8
  },
  Wapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: 20
  }
})