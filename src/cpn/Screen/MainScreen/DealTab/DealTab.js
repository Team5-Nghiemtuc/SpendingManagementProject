import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import DaySelection from './DaySelection';
export default class DealTab extends Component {
    static navigationOptions = {
        tabBarLabel: 'Giao dịch',
        tabBarIcon: ({ tintColor }) => (
            <Icon 
             name='compare-arrows'
             color={tintColor}
             size={32}
            />
        ),
    };
    render() {
        return (
            <View>
                <DaySelection />
                <Text> DealTab </Text>
            </View>
        )
    }
}