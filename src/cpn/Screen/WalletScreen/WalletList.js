import React, { Component } from 'react'
import { Text, View, FlatList,StyleSheet, TouchableOpacity, Dimensions } from 'react-native'
import Service from '../../../Classes/Service'
import Color from '../../Style/Color'
import {connect} from 'react-redux'

const {width, height} = Dimensions.get('window');

class ListItem extends Component {
    render() {
        const {
            selected,
            index,
            SelectIndex,
            item
        } = this.props;
        const {
            ItemWapper,
            ItemTextSelected,
            ItemText,
            ItemWapperSelected
        }= style
        const bool = index===selected;
        return(
        <View
        >
        <TouchableOpacity
        style={bool? [ItemWapper,ItemWapperSelected]: ItemWapper}                        
        onPress={SelectIndex}
        >
            <Text style={bool? [ItemText,ItemTextSelected]: ItemText}>
                {item.Name}
            </Text>
            {/* <View style={{width:'30%'}} /> */}
            <Text style={bool? [ItemText,ItemTextSelected]: ItemText}>
                {item.Amount}
            </Text>
        </TouchableOpacity>
        </View>
        )
    }
}

class List extends Component {
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
  changeSelect(){
      this.setState({
          selected: index
      })
  }
  render() {
    return (
      <View>
        <FlatList
        data={Service.getAllWallet()}
        renderItem={({item,index})=><ListItem 
        item={item} 
        selected={this.state.selected}
        SelectIndex={()=>{
            if(index!==this.state.selected){
                this.setState({
                    selected: index
                })
                Service.setWallet(Service.getAllWallet()[index].ID);
                const action = {
                    type: 'SET_WALLET',
                    wallet: Service.findWallet(item.ID)
                  }
                this.props.dispatch(action)
            }
        }}
        index={index}/>}
        keyExtractor={(item,index)=>item.ID}
        style={style.List}
        />
      </View>
    )
  }
}

export default connect()(List)

const style = StyleSheet.create({
    List:{
        alignSelf: 'center',
        margin: 30,
        width: '100%',
        height: height*0.8
    },
    ItemWapper:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        alignSelf: 'center',
        backgroundColor: Color.header,
        height: height*0.1,
        margin: 2 
    },
    ItemText:{
        fontSize: 20,
        color: Color.textHeader,
        alignSelf: 'center',
        margin:5
    },
    ItemTextSelected:{
        color: Color.header
    }
    ,
    ItemWapperSelected:{
       backgroundColor: Color.textHeader,
    }
})