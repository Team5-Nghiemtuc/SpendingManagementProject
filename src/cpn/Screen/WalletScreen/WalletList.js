import React, { Component } from 'react'
import { Text, View, FlatList,StyleSheet } from 'react-native'
import Service from '../../../Classes/Service'

class ListItem extends Component {
    render() {
        return(
        <View
        style={this.props.index===this.props.selected ? style.ItemWapperSelected: style.ItemWapper}        
        >
            <Text style={style.ItemText}>
                {this.props.item.Name}
            </Text>
            <View style={{width:'30%'}} />
            <Text style={style.ItemText}    >
                {this.props.item.Amount}
            </Text>
        </View>
        )
    }
}

export default class List extends Component {
  constructor(props){
      super(props);
      this.state={
          selected: 0
      }
  }

  componentWillMount(){
      let save = Service.get();
      let walletlist = Service.getAllWallet();
      for(let i=0;i<walletlist.length;i++){
          if(save.ID_wallet===walletlist[i].ID){
              this.setState({
                selected: i
              })
              break;
          }
      }
  }
  render() {
    return (
      <View>
        <FlatList
        data={Service.getAllWallet()}
        renderItem={({item,index})=><ListItem 
        item={item} 
        selected={this.state.selected}
        index={index}/>}
        keyExtractor={(item,index)=>item.ID}
        style={style.List}
        />
      </View>
    )
  }
}

const style = StyleSheet.create({
    List:{
        alignSelf: 'center',
        margin: 30,
    },
    ItemWapper:{
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'white',
        margin: 1
    },
    ItemText:{
        fontSize: 20,
    },
    ItemWapperSelected:{
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: '80%',
        alignSelf: 'center',
        backgroundColor: 'red',
        margin: 1
    }
})