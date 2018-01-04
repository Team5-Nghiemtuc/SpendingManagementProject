import React, { Component } from 'react'
import { View, Dimensions, Button } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { connect } from 'react-redux'
import Service from '../../../../Classes/Service'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryPie, VictoryContainer } from 'victory-native'
import Svg, { Circle, Text,Rect } from 'react-native-svg'
import Color from '../../../Style/Color';

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
      wallet: null,
      text: '',
      selected: 0
    }
  }

  componentWillMount() {
    data = this.getData(this.props.day, this.props.wallet)
  }

  componentWillReceiveProps = (next) => {
    data = this.getData(next.day, next.wallet)
  }

  getData(day, wallet) {
    let array = Service.getDailyDealByType(day, wallet.ID)
    let res = []
    let amount = 0;
    array.forEach(e => {
      e.Type.Type ? (res.push({ Amount: e.Amount, Type: e.Type.Name }), amount += e.Amount) : 0
    })
    this.setState({
      total: amount
    })
    return res
  }

  render() {
    return (
      <View>
      {/* <Button 
      title={'Text'}
      /> */}
      <View style={{backgroundColor:'white', marginTop:10}}>
        {/* //<Text>{this.props.day.toString()}</Text> */}
        <Svg
          width={width * 0.8}
          height={width * 0.85}
          style={{ alignSelf: 'center' }}
        >
          <Rect 
          x={0} y={0}
          width={width * 0.8}  height={width * 0.8}
          fill={'white'}
          />
          <Circle
            cx={width * 0.8 / 2}
            cy={width * 0.8 / 2}
            r={width * 0.15 - 5}
            fill="none"
            stroke="black"
            strokeWidth={1}
          />
          <Circle
            cx={width * 0.8 / 2}
            cy={width * 0.8 / 2}
            r={width * 0.3 - 5}
            fill="none"
            stroke="black"
            strokeWidth={1}
          />
          <VictoryPie
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPressIn: ()=>{
                    return [
                      {
                        target: "data",
                        mutation: (props) => {
                          this.setState({
                            text:props.datum.Type,
                            selected:props.datum.Amount
                          })
                        }
                      }]
                  }
                }
              }
            ]}
            data={data}
            y='Amount'
            x='Type'
            standalone={false}
            padAngle={2}
            width={width * 0.8}
            height={width * 0.8}
            colorScale={color}
            innerRadius={width * 0.15}
            labels={() => null}
            style={{
              labels: { fontSize: 0 },
            }}

          />
          <Text
            fill={'red'}
            stroke="#E9E9EF"
            fontSize="20"
            strokeWidth="1"
            fontWeight="bold"
            x={width * 0.4}
            y={width * 0.4}
            textAnchor="middle">
          {`${(this.state.selected/this.state.total*100).toFixed(2)}%`}
          </Text>
          <Text
            fill={Color.header}
            stroke="#E9E9EF"
            fontSize="20"
            fontWeight="bold"
            strokeWidth="1"
            x={width*0.4}
            y={width*0.8-10}
            textAnchor="middle"
          >{this.state.text}</Text>
        </Svg>
        {/* <Text></Text> */}
      </View>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { wallet: state.wal.wallet, day: state.rec.day }
}

export default connect(mapStateToProps)(StatictisTab);