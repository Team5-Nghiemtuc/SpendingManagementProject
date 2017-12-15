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
            toDay: today.toLocaleDateString(),
            nextDay: nextday.toLocaleDateString(),
            preDay: preday.toLocaleDateString()
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
                <TouchableOpacity
                    style={[buttonStyle, selectedButton]}
                >
                    <Text
                        style={text}
                    >{this.props.value.toLocaleDateString()}</Text> 
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