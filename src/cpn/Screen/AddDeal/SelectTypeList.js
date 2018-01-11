import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, StyleSheet, Button, Dimensions } from 'react-native'
import Modal from 'react-native-modalbox'
import { Icon } from 'react-native-elements';
import Service from '../../../Classes/Service'


export default class SelectTypeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            index: -1,
            selected: true,
            data: props.dataC,
            change: false
        }
    }

    open() {
        this.refs.myModal.open()
    }

    select() {
        this.refs.myModal.close()
    }
    newType() {
        this.props.navigation.navigate('Type',{back: this.onBack.bind(this)})
    }

    onBack(item){
      this.setState({
          change: !this.state.change
      })
    } 
    

    render() {
        const Button = this.props.add ? <Icon
            name='ios-add-circle-outline'
            type='ionicon'
            onPress={this.newType.bind(this)}
            color={'#498BD0'}
        /> : <View />
        return (
            <Modal
                animationType='fade'
                ref={'myModal'}
                backDrop={false}
                onClosed={this.props.close}
                style={style.Modal}
            >
                <View>
                    <View
                        style={{ flexDirection: 'row' }}
                    >
                        <TouchableOpacity
                            style={[style.button,{borderTopLeftRadius: 20}]}
                            onPress={()=>{
                                this.setState({
                                    selected: true,
                                    data: this.props.dataC
                                })
                            }}
                        >
                            <Text>Thu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[style.button,{borderTopRightRadius: 20}]}
                            onPress={()=>{
                                this.setState({
                                    selected: false,
                                    data: this.props.dataE
                                })
                            }}
                        >
                            <Text>Chi</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={this.state.selected ? this.props.dataC : this.props.dataE }
                        renderItem={({ item, index }) =>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.Select(item);
                                }}
                                style={style.ItemS}
                            >
                                <Text
                                    style={style.Text}
                                >{item.Name}</Text>
                            </TouchableOpacity>}
                        keyExtractor={(item, index) => item.ID}
                        style={{
                            height: '80%'
                        }}
                    />
                    {Button}
                </View>

            </Modal>

        )
    }
}

const style = StyleSheet.create({
    Modal: {
        width: '60%',
        backgroundColor: 'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#7CDCFE',
        height: '60%'
    },
    ItemS: {
        margin: 10,
        borderBottomWidth: 1,
        borderColor: '#7CDCFE',
        alignItems: 'center'
    },
    Text: {
        fontSize: 20,
        color: '#498BD0'
    },
    button: {
        width: '50%', 
        alignItems: 'center', justifyContent: 'space-around',
        borderWidth: 2,
        borderColor: '#7CDCFE',
        backgroundColor: Color.textHeader,
        marginBottom: 10,
    }
})