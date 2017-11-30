import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import Header from './Header/Header'
import TabNav from './TabNav';
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1
    }
})