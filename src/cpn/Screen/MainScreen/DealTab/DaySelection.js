import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import Colors from '../../../Style/Color';

const { height, width } = Dimensions.get('window');

export default class DaySelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preDay: 'Hôm qua',
            toDay: 'Hôm nay',
            nextDay: 'Ngày mai'
        }
    }
    getPreDay() {
        let pre = '';
        switch(this.state.toDay){
            case 'Hôm nay':{
                let day = new Date();
                day.setDate(day.getDate()-2);
                pre = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`   
                break;
            }
            case 'Hôm qua':{
                let day = new Date();
                day.setDate(day.getDate()-3);
                pre = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`   
                break;
            }
            case 'Ngày mai':{
                 pre='Hôm qua';
                 break;
            }
            default:{
                let dayArr=this.state.toDay.split('/');
                let day = new Date(parseInt(dayArr[2]),parseInt(dayArr[1])-1,parseInt(dayArr[0]));
                console.log(day);
                day.setDate(day.getDate()-2);
                pre = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`                 
                break;
            }
        }
        this.setState({
            nextDay: this.state.toDay,
            toDay: this.state.preDay,
            preDay: pre
        })
    }

    getNextDay(){
        let pre = '';
        switch(this.state.toDay){
            case 'Hôm nay':{
                let day = new Date();
                day.setDate(day.getDate()+2);
                pre = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`   
                break;
            }
            case 'Ngày mai':{
                let day = new Date();
                day.setDate(day.getDate()+3);
                pre = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`   
                break;
            }
            case 'Hôm qua':{
                pre='Ngày mai';
                break;
            }
            default:{
                let today = new Date();
                let dayArr=this.state.toDay.split('/');
                let day = new Date(parseInt(dayArr[2]),parseInt(dayArr[1])-1,parseInt(dayArr[0]));
                day.setDate(day.getDate()+2);
                pre = `${day.getDate()}/${day.getMonth() + 1}/${day.getFullYear()}`                 
                break;
            }
        }
        this.setState({
            preDay: this.state.toDay,
            toDay: this.state.nextDay,
            nextDay: pre

        })

    }

    componentDidUpdate(){
        let dayArrNext = this.state.nextDay.split('/');
        let dayNext = new Date(parseInt(dayArrNext[2]), parseInt(dayArrNext[1]) - 1, parseInt(dayArrNext[0]));
        let dayArrPre = this.state.preDay.split('/');
        let dayPre = new Date(parseInt(dayArrPre[2]), parseInt(dayArrPre[1]) - 1, parseInt(dayArrPre[0]));
        let today = new Date();
        let preDay = new Date();
        preDay.setDate(preDay.getDate() - 1);
        let nextDay = new Date();
        nextDay.setDate(nextDay.getDate() + 1);
        if (preDay.getDate() === dayNext.getDate()
            && preDay.getMonth() === dayNext.getMonth()
            && preDay.getFullYear() === dayNext.getFullYear()) {
            this.setState({
                nextDay: 'Hôm qua'
            })
        }
        if (today.getDate() === dayNext.getDate()
            && today.getMonth() === dayNext.getMonth()
            && today.getFullYear() === dayNext.getFullYear()) {
            this.setState({
                nextDay: 'Hôm nay'
            })
        }
        if (nextDay.getDate() === dayNext.getDate()
            && nextDay.getMonth() === dayNext.getMonth()
            && nextDay.getFullYear() === dayNext.getFullYear()) {
            this.setState({
                nextDay: 'Ngày mai'
            })
        }
        if (preDay.getDate() === dayPre.getDate()
            && preDay.getMonth() === dayPre.getMonth()
            && preDay.getFullYear() === dayPre.getFullYear()) {
            this.setState({
                preDay: 'Hôm qua'
            })
        }
        if (today.getDate() === dayPre.getDate()
            && today.getMonth() === dayPre.getMonth()
            && today.getFullYear() === dayPre.getFullYear()) {
            this.setState({
                preDay: 'Hôm nay'
            })
        }
        if (nextDay.getDate() === dayPre.getDate()
            && nextDay.getMonth() === dayPre.getMonth()
            && nextDay.getFullYear() === dayPre.getFullYear()) {
            this.setState({
                preDay: 'Ngày mai'
            })
        }

    }
    render() {
        const {
        wapper,
            buttonStyle,
            selectedButton,
            text
    } = style;
        return (
            <View style={wapper}>
                <TouchableOpacity
                    style={buttonStyle}
                    onPress={this.getPreDay.bind(this)}
                >
                    <Text
                        style={text}
                    >{this.state.preDay}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[buttonStyle, selectedButton]}
                >
                    <Text
                        style={text}
                    >{this.state.toDay}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={buttonStyle}
                    onPress={this.getNextDay.bind(this)}
                >
                    <Text
                        style={text}
                    >{this.state.nextDay}</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    wapper: {
        flexDirection: 'row',
        height: height / 20
    },
    buttonStyle: {
        width: width / 3,
        backgroundColor: Colors.active,
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    selectedButton: {
        backgroundColor: Colors.unactive,
        borderLeftWidth: 2,
        borderRightWidth: 2,
        borderColor: '#774d0d'
    },
    text: {
        color: Colors.textHeader,
    }
})