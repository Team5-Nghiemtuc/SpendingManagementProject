import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import ActionButton from 'react-native-action-button';
import Header from './Header/Header'
import TabNav from './TabNav';
import Colors from '../../Style/Color';
const { height, width } = Dimensions.get('window');


export default class MainScreen extends Component {
    render() {
        const {
        header
    } = styles;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    navigation={this.props.navigation}
                />
                <TabNav />
                <ActionButton
                    buttonColor={Colors.header}
                    offsetX={20}
                    offsetY={height/6}
                    onPress={()=>{this.props.navigation.navigate('AddDeal')}}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1
    }
})