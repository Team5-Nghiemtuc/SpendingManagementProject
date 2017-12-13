import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import Icon from 'react-native-vector-icons/Entypo'
import Color from '../../Style/Color'
import Style from '../../Style/Styles'

const { height, width } = Dimensions.get('window');

export default class Header extends Component {
    goBack() {
        this.props.navigation.navigate('Main')
    }
    render() {
        const {
                text,
            wapper,
            icon,
            another
            } = styles;
        let iconCheck = <Icon.Button
            name='check'
            size={30}
            color={Color.textHeader}
            backgroundColor={Color.header}
            onPress={this.props.check}
            style={icon}
        />
        let iconAdd =
            <Icon.Button
                name='add-to-list'
                size={30}
                color={Color.textHeader}
                backgroundColor={Color.header}
                onPress={this.props.addNew}
                style={icon}
            />
        let left = this.props.add ? iconAdd : iconCheck;
        return (
            <View style={Style.wapper}>
                <View
                    style={icon}
                >
                    <Icon.Button
                        name='chevron-thin-left'
                        size={30}
                        color={Color.textHeader}
                        backgroundColor={Color.header}
                        onPress={this.goBack.bind(this)}
                    />
                </View>
                <Text
                    style={text}
                >{this.props.name}
                </Text>
                {left}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Color.textHeader,
        alignSelf: 'center',
        flex: 3,
        textAlign: 'center'
    },
    icon: {
        flex: 1,
        margin: 20
    },
    another: {
        flex: 1,
        height: height * 0.1,
        margin: 20
    }
})