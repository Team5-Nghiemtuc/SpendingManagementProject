import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet } from 'react-native'
import Func from '../../../../Classes/Function'


export default class List extends Component {

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={({ item, index }) => <ListItem item={item} />}
                keyExtractor={(item, index) => index}
            />
        )
    }
}

class ListItem extends Component {
    render() {
        const {
            item
        } = this.props
        const { textWapper, text } = style
        return (
            <View style={textWapper}>
                <Text
                    style={text}
                >{item.Type}</Text>
                <Text
                    style={text}
                >{`${Func.fommatAmount(item.Amount)}đ`}</Text>
            </View>
        )
    }
}

const style = StyleSheet.create({
    textWapper: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    text: {
        marginVertical: 10, marginHorizontal: 50, fontSize: 20, color: 'black'
    }
})