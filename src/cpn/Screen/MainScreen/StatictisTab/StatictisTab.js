import React, { Component } from 'react'
import { View, Dimensions, Button, Text, DatePickerAndroid, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'
import Service from '../../../../Classes/Service'
import Color from '../../../Style/Color';
import Chart from './Chart'
import DaySelection from './DaySelection'
import Func from '../../../../Classes/Function'

const data = []
const color = [
  "#56E2CF", "#56AEE2", "#5668E2", "#222222", "#CF56E2", "#E256AE", "#E25668", "#E28956",
  "#E2CF56", "#AEE256", "#68E256", "#56E289"
]
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
      total: 0,
      wallet: props.wallet,
      text: '',
      selected: 0,
      firstDay: props.day,
      secondDay: props.day
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
      e.Type.Type ? (res.push({ Amount: e.Amount, Type: e.Type.Name }), amount += e.Amount) : 0
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
    let body = data.length > 0 ?
      <Chart
        data={data}
        color={color}
        total={this.state.total}
      /> :
      <Text> Chưa có giao dịch nào</Text>
    return (
      <View>
        <DaySelection
          firstDay={this.state.firstDay}
          secondDay={this.state.secondDay}
          parent={this}
        />
        <ScrollView
        style={{height: '95%'}}
        >
        <View
          style={{ backgroundColor: Color.textHeader, marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
        >
          <Text
            style={{ marginVertical: 10, marginHorizontal: 20, fontSize: 20 }}
          >Tổng</Text>
          <Text
            style={{ marginVertical: 10, marginHorizontal: 20, fontSize: 25, color: 'red' }}
          >{`${Func.fommatAmount(this.state.total)}đ`}</Text>
        </View>
          {body}
          <View>
            <Icon
              name='assessment'
              size={100}
            /></View>
            </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { wallet: state.wal.wallet, day: state.rec.day }
}

export default connect(mapStateToProps)(StatictisTab);