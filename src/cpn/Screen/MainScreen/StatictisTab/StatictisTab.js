import React, { Component } from 'react'
import { View, Dimensions, Button, Text, DatePickerAndroid, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'
import Service from '../../../../Classes/Service'
import Color from '../../../Style/Color';
import Chart from './Chart'
import DaySelection from './DaySelection'
import Func from '../../../../Classes/Function'
import List from './List'

const data = []
const color = [
  "#56E2CF", "#56AEE2", "#5668E2", "#222222", "#CF56E2", "#E256AE", "#E25668", "#E28956",
  "#E2CF56", "#AEE256", "#68E256", "#56E289"
]
let check = true
const { height, width } = Dimensions.get('window');

class StatictisTab extends Component {
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
  constructor(props) {
    super(props);
    this.state = {
      chart: true,
      total: 0,
      wallet: props.wallet,
      text: '',
      selected: 0,
      firstDay: props.day,
      secondDay: props.day,
    }
  }

  componentDidMount() {
    if (this.state.wallet && this.state.firstDay && this.state.secondDay) {
      data = this.setData(this.state.firstDay, this.state.secondDay, this.state.wallet)
    }
  }

  Update() {
    if (this.state.wallet && this.state.firstDay && this.state.secondDay) {
      data = this.setData(this.state.firstDay, this.state.secondDay, this.state.wallet)
    }
  }


  componentWillReceiveProps = (next) => {
    this.setState({
      firstDay: next.day,
      secondDay: next.day
    })
    if (this.state.wallet && this.state.firstDay && this.state.secondDay) {
      data = this.setData(this.state.firstDay, this.state.secondDay, this.state.wallet)
    }
  }

  setData(fDate, sDate, wallet) {
    let array = Service.getDealWithTime(fDate, sDate, wallet.ID)
    let res = []
    let amount = 0
    array.forEach(e => {
      e.Type.Type === check ? (res.push({ Amount: e.Amount, Type: e.Type.Name }), amount += e.Amount) : 0
    })
    this.setState({
      total: amount
    })
    return res
  }

  async PickADate(num) {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: new Date(),
        mode: 'spinner'
      });
      if (action != DatePickerAndroid.dismissedAction) {
        this.setState({
          firstDay: num === 1 ? new Date(year, month, day) : this.state.firstDay,
          secondDay: num === 2 ? new Date(year, month, day) : this.state.secondDay
        })
      }
    } catch (e) {

    }
  }

  render() {
    const { sumWapper, sumLable, sumText, buttonWapper, iconButton, textButton, touch } = style
    let chart = this.state.chart ?
      <Chart
        data={data}
        color={color}
        total={this.state.total}
      /> :
      <List
        data={data}
      />
    let body = data.length > 0 ?
        chart :
      <Text> Chưa có giao dịch nào</Text>
    return (
      <View>
        <DaySelection
          firstDay={this.state.firstDay}
          secondDay={this.state.secondDay}
          parent={this}
        />
        <ScrollView
          style={{ height: '90%' }}
        >
          <View
            style={sumWapper}
          >
            <Text
              style={sumLable}
            >Tổng</Text>
            <Text
              style={sumText}
            >{`${Func.fommatAmount(this.state.total)}đ`}</Text>
          </View>
          <View
            style={buttonWapper}
          >
            <TouchableOpacity style={touch}
              onPress={() => {
                check = !check
                this.Update()
              }}
            >
              <Text
                style={textButton}
              >{`${check ? 'Chi' : 'Thu'}`}</Text>
            </TouchableOpacity>
            <Icon
              name={this.state.chart ?'subject':'pie-chart'}
              size={28}
              style={iconButton}
              onPress={()=>{this.setState({
                chart: !this.state.chart
              })}}
            />
          </View>
          {body}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { wallet: state.wal.wallet, day: state.rec.day }
}

export default connect(mapStateToProps)(StatictisTab);

const style = StyleSheet.create({
  sumWapper: { backgroundColor: Color.textHeader, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' },
  sumLable: { marginVertical: 10, marginHorizontal: 20, fontSize: 20 },
  sumText: { marginVertical: 10, marginHorizontal: 20, fontSize: 25, color: 'red' },
  buttonWapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: Color.textHeader,
    alignItems: 'center'
  },
  iconButton: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  textButton: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 10,
    marginVertical: 5
  },
  touch: {
    borderWidth: 1,
    borderColor: '#717573',
    borderRadius: 5
  }
})