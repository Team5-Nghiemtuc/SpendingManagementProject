import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'
import Service from '../../../../Classes/Service'
import { VictoryBar, VictoryChart, VictoryAxis,VictoryLabel,VictoryPie } from 'victory-native'

const data = []

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
      list: null
    }
  }
  componentWillMount = () => {
    data = this.getData()
    console.log(data)
  }

  getData() {
    let array = Service.getDailyDealByType(this.props.day, this.props.wallet.ID)
    let res = []
    array.forEach(e => {
      e.Type.Type ? res.push({ Amount: e.Amount, Type: e.Type.Name }) : 0
    })
    return res
  }

  render() {
    return (
      <View>
              <VictoryPie
                padding={30}
                data={data}
                x='Type'
                y='Amount'
                width={250}
                height={250}
                animate={{
                  duration: 2000
                }}
                padAngle={3}
                padding={{ top: 20, bottom: 60,left:100 }}
                innerRadius={100}
                colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
                style={{ labels: { fill: "black", fontSize: 12, fontWeight: "bold" },
                data: {flexDirection: 'center'},
                parent: {width:'100%',justifyContent:'space-around'} }}
              />
      </View>
    )
  }
}

class Temp extends Component {

  render() {
    return (
      <View>
        <Text> StatictisTab </Text>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { wallet: state.wal.wallet, day: state.rec.day }
}

export default connect(mapStateToProps)(StatictisTab);