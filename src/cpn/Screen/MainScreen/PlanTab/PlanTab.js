import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default class PlanTab extends Component {
    static navigationOptions = {
        tabBarLabel: 'Kế hoạch',
        tabBarIcon: ({ tintColor }) => (
            <Icon
                name='assignment'
                color={tintColor}
                size={32}
            />
        ),
    };
    render() {
        return (
            <View>
                <Text> PlanTab </Text>
            </View>
        )
    }
}