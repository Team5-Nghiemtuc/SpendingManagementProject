import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';

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
                <Text> DealTab </Text>
            </View>
        )
    }
}