import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    Dimensions
} from 'react-native'
import {connect} from 'react-redux'
import Colors from '../../../Style/Color';
import Func from '../../../../Classes/Function'

const { height, width } = Dimensions.get('window');

class DaySelection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            preDay: '',
            toDay: '',
            nextDay: ''
        }
    }

    setDay(day) {
        const today = day
        const nextday = new Date(today);
        const preday = new Date(today); 
        nextday.setDate(nextday.getDate()+1);
        preday.setDate(preday.getDate()-1);
        this.setState({
            toDay: Func.DateConvert(today),
            nextDay: Func.DateConvert(nextday),
            preDay: Func.DateConvert(preday)
        })
    }

    getPreDay() {
        this.props.dispatch({type:'PRE_DAY'})    
    }

    getNextDay(){
        this.props.dispatch({type:'NEXT_DAY'})
    }

    componentWillMount(){
        this.setDay(this.props.value)
    }

    componentWillReceiveProps(nextProps){
        this.setDay(nextProps.value);
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
                <View
                    style={[buttonStyle, selectedButton]}
                >
                    <Text
                        style={[text,{color:Colors.header}]}
                    >{Func.DateConvert(this.props.value)}</Text> 
                </View>
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

function mapStateToProps(state)  {
    return {value: state.rec.day}
}

export default connect(mapStateToProps) (DaySelection);

const style = StyleSheet.create({
    wapper: {
        flexDirection: 'row',
        height: height / 20
    },
    buttonStyle: {
        width: width / 3,
        backgroundColor: Colors.textHeader,
        alignItems: 'center',
        borderBottomWidth:1,
        justifyContent: 'space-around',
        borderColor: '#C5C5C5'
        
    },
    selectedButton: {
        backgroundColor: Colors.textHeader,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderBottomWidth:1,
        borderColor: '#C5C5C5'
    },
    text: {
        color: Colors.unactive,
    }
})