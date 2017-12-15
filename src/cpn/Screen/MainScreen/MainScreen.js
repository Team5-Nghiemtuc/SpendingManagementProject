import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    AsyncStorage
} from 'react-native'
import ActionButton from 'react-native-action-button';
import Header from './Header/Header'
import TabNav from './TabNav';
import Colors from '../../Style/Color';
import Service from '../../../Classes/Service'
import Type from '../../../Classes/Type'
import Function from '../../../Classes/Function'
const { height, width } = Dimensions.get('window');


export default class MainScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            firstLaunch: null
        }
    }
    componentWillMount(){
        if(Service.get()==null){
            Service.add('000');
            Service.addDfType();
        }
    }

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