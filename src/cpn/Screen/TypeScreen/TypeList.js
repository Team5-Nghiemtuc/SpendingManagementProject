import React, { Component } from 'react'
import { Text, View, FlatList, StyleSheet, Dimensions, TextInput,Alert, Keyboard } from 'react-native'
import Color from '../../Style/Color'
import Function from '../../../Classes/Function'
import Service from '../../../Classes/Service'
import Type from '../../../Classes/Type'
import { Divider, Icon } from 'react-native-elements';



const { height, width } = Dimensions.get('window');



export default class TypeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            check: true
        }
    }
    render() {
        const {
        List,
            Input
    } = style;
        const check = <Icon
            reverse
            name='check'
            color='#498BD0'
            size={20}
            onPress={()=>{
                let id = Function.idType(Service.getAllType().length)
                if(Service.checkTypeName(this.state.value)){
                    Alert.alert(
                        'Loại giao dịch này đã tồn tại'
                    )
                }else{
                    Service.addNewType(new Type(id,this.state.value,this.props.select))
                    this.refs.Input.clear()
                    Keyboard.dismiss()
                }
                this.forceUpdate();
            }}
        />
        const itemcheck = this.state.check ? <View /> : check;
        return (
            <View
                style={List}
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <TextInput
                        ref={'Input'}
                        style={Input}
                        placeholder='Nhập loại mới'
                        underlineColorAndroid='transparent'
                        onChangeText={(text) => {
                            this.setState({
                                value: text,
                                check: text === ''
                            })
                        }}
                    />
                    {itemcheck}
                </View>
                <Divider />
                <View>
                <FlatList
                    data={this.props.select ?  Service.getTypeCollec() : Service.getTypeEx() }
                    keyExtractor={(item, index) => item.ID}
                    renderItem={
                        ({ item, index }) =>
                            <TypeItem
                                index={index}
                                item={item}
                            />
                    }
                   style={{minHeight:'80%',maxHeight:'90%'}}
                />
                </View>
            </View>
        )
    }
}
const arr = ['0','1','2','3']
class TypeItem extends Component {

    render() {
        const {
            TextS,
            ItemDf
        } = style;
        const {
            item,
            index
        } = this.props
        const DefaultItem =
            <View style={ItemDf}>
                <Text style={TextS}>{item.Name}</Text>
            </View>
        const DeleteItem =
            <View style={ItemDf}>
                <Text style={[TextS,{color:'black'}]}>{item.Name}</Text>
            </View>
        const Item = arr.lastIndexOf(item.ID)>-1 ? DefaultItem : DeleteItem;
        return (
            Item
        )
    }
}

const style = StyleSheet.create({
    List: {
        backgroundColor: Color.textHeader,
    },
    TextS: {
        color: Color.header,
        fontSize: 15,
    },
    ItemDf: {
        // backgroundColor: 'red',//Color.header,
        height: height * 0.1,
        flex:1,
        alignSelf: 'center',
        width: width,
        paddingLeft: 30,
        borderBottomWidth: 1,
        justifyContent: 'space-around',
        borderColor: '#E9E9EF'
    },
    Input: {
        backgroundColor: Color.textHeader,
        height: height*0.1,
        paddingLeft: 30,
        flex: 6
    }
})