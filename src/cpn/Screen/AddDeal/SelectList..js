import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity,StyleSheet } from 'react-native'
import Modal from 'react-native-modalbox'
import { Icon } from 'react-native-elements';

export default class SelectList extends Component {
    constructor(props){
        super(props);
        this.state={
            open:false,
            index: -1
        }
    }
    open(){
        this.refs.myModal.open()
    }

    select(){
        this.refs.myModal.close()
    }
    newType(){
        this.props.navigation.navigate('Type')
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
              backDrop={true}
              onClosed={this.props.close}
              style={style.Modal}
            >
                <View>
                <FlatList 
                         data={this.props.data}
                         renderItem={({item,index})=>
                         <TouchableOpacity
                          onPress={()=>{
                              this.props.Select(item);
                          }}
                          style={style.ItemS}
                         >
                             <Text
                              style={style.Text}
                             >{item.Name}</Text>
                        </TouchableOpacity>}
                         keyExtractor={(item,index)=>item.ID}
                         
                />
                {Button}
               </View>
               
            </Modal>

    )
  }
}

const style=StyleSheet.create({
    Modal:{
        width: '60%',
        backgroundColor:'white',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#7CDCFE',
        height: '60%'
    },
    ItemS:{
       margin: 10,
        borderBottomWidth: 1,
        borderColor:'#7CDCFE',
        alignItems:'center'
    },
    Text:{
        fontSize: 20,
        color: '#498BD0'
    }
})