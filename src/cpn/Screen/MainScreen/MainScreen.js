import React, { Component } from 'react'
import {
    Text,
    View,
    StyleSheet,
    Dimensions,
    AsyncStorage,
    DatePickerAndroid
} from 'react-native'
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux'
import Header from './Header/Header'
import TabNav from './TabNav';
import Colors from '../../Style/Color';
import Service from '../../../Classes/Service'
import Type from '../../../Classes/Type'
import Function from '../../../Classes/Function'
import RateModal from './RateModal'

const { height, width } = Dimensions.get('window');


class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstLaunch: null
        }
    }
    componentWillMount() {
        if (Service.get() == null) {
            Service.add('000');
            Service.addDfType();
        }
    }
    openRateModal(){
        this.refs.RateModal.open()
    }
    async PickADate() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date()
            });
            if (action != DatePickerAndroid.dismissedAction) {
                const action = {
                    type: 'PICK_A_DATE',
                    day: new Date(year, month, day)
                }
                this.props.dispatch(action)
            }
        } catch (e) {
            const action = {
                type: 'PICK_A_DATE',
                day: new Date()
            }
            this.props.dispatch(action)
        }
    }

    render() {
        const {
        header
    } = styles;
        return (
            <View style={{ flex: 1 }}>
                <Header
                    navigation={this.props.navigation}
                />
                <TabNav
                />
                <ActionButton
                    size={35}
                    buttonColor={Colors.header}
                    offsetY={height/10}
                    icon={<Icon name='circle' type='entypo' color={Colors.textHeader} />}
                // onPress={()=>{this.props.navigation.navigate('AddDeal')}}
                >
                    <ActionButton.Item
                        onPress={this.openRateModal.bind(this)}
                        title='Đánh giá'
                    >
                        <Icon name='line-graph' type='entypo' color={Colors.textHeader} />
                    </ActionButton.Item>
                    <ActionButton.Item
                        onPress={() => this.PickADate()}
                        title='Đi đến ngày'
                    >
                        <Icon name='ios-calendar' type='ionicon' color={Colors.textHeader} />
                    </ActionButton.Item>
                    <ActionButton.Item
                        onPress={
                            () => {
                                this.props.navigation.navigate('AddDeal')
                            }
                        }
                        title='Thêm giao dịch mới'
                    >
                        <Icon name='ios-add' type='ionicon' color={Colors.textHeader} />
                    </ActionButton.Item>
                </ActionButton>
                <RateModal 
                 ref={'RateModal'}
                 wallet={this.props.wallet}
                />
            </View>
        )
    }
}

function mapStateToProps(state){
    return { wallet: state.wal.wallet}
}
export default connect(mapStateToProps)(MainScreen)

const styles = StyleSheet.create({
    header: {
        flex: 1
    }
})