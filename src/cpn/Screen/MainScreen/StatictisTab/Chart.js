import React, { Component } from 'react'
import {Dimensions, View, TouchableOpacity} from 'react-native'
import Service from '../../../../Classes/Service'
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryPie, VictoryContainer } from 'victory-native'
import Svg, { Circle, Text, Rect, } from 'react-native-svg'
import Color from '../../../Style/Color';

const { height, width } = Dimensions.get('window');


export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            wallet: null,
            text: '',
            selected: 0
        }
    }
    componentWillReceiveProps(next){
        if(next.data!==this.props.data){
        this.setState({
            selected: 0
        })
    }
    }
    render() {
        return (
            <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                {/* //<Text>{this.props.day.toString()}</Text> */}
                <Svg
                    width={width * 0.8}
                    height={width * 0.8}
                    style={{ alignSelf: 'center' }}
                >
                    <Rect
                        x={0} y={0}
                        width={width * 0.8} height={width * 0.8}
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
                                    onPressIn: () => {
                                        return [
                                            {
                                                target: "data",
                                                mutation: (props) => {
                                                    this.setState({
                                                        text: props.datum.Type,
                                                        selected: props.datum.Amount
                                                    })
                                                }
                                            }]
                                    }
                                }
                            }
                        ]}
                        data={this.props.data}
                        y='Amount'
                        x='Type'
                        standalone={false}
                        padAngle={2}
                        width={width * 0.8}
                        height={width * 0.8}
                        colorScale={this.props.color}
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
                        {`${(this.state.selected / this.props.total * 100).toFixed(2)}%`}
                    </Text>
                    <Text
                        fill={Color.header}
                        stroke="#E9E9EF"
                        fontSize="20"
                        fontWeight="bold"
                        strokeWidth="1"
                        x={width * 0.4}
                        y={width * 0.8 - 10}
                        textAnchor="middle"
                    >{this.state.text}</Text>
                </Svg>
            </View>

        )
    }
}
