import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modalbox'
import { Divider } from 'react-native-elements'
import Service from '../../../Classes/Service'
import Func from '../../../Classes/Function'
import Color from '../../Style/Color';


export default class RateModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            target: 0,
            check: true
        }
    }
    open() {
        let total = Service.getTotalDealByDateAndWallet(new Date(), this.props.wallet.ID)
        let save = Service.get()
        let target = save.Targets / 30
        this.refs.myModal.open()
        console.log(total > target)
        this.setState({
            total: total,
            target: target,
            check: total > target
        })
    }

    render() {
        const {
        Wapper, TextS, TextIn, TextNum
    } = style
        const Under =
            <View>
                <Text
                    style={TextIn}
                >Số tiền còn lại:</Text>
                <Text
                    style={TextNum}
                >{`${Func.fommatAmount(this.state.target - this.state.total)}đ`}</Text>
            </View>
        const Over =
            <View>
                <Text
                    style={TextIn}
                >Bạn đã dùng vượt quá chỉ tiêu:</Text>
                <Text
                    style={[TextNum,{color:'red'}]}
                >{`${Func.fommatAmount(this.state.total - this.state.target)}đ`}</Text>
            </View>
        const RestText = this.state.check ? Over : Under
        return (
            <Modal
                animationType='fade'
                ref={'myModal'}
                backDrop={true}
                style={Wapper}
            >
                <View>
                    <Text
                        style={TextS}
                    > Đánh giá</Text>
                    <Divider />
                    <Text
                        style={TextIn}
                    >Hiện đây bạn đã dùng tổng cộng:</Text>
                    <Text
                        style={TextNum}
                    >{`${Func.fommatAmount(this.state.total)}đ`}</Text>
                    {RestText}
                    <Text
                        style={TextIn}>So với chỉ tiêu ngày:</Text>
                    <Text
                        style={TextNum}
                    >{`${Func.fommatAmount(this.state.target)}đ`}</Text>

                </View>
            </Modal>
        )
    }
}

const style = StyleSheet.create({
    Wapper: {
        width: '80%',
        height: '35%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#757578',
    },
    TextS: {
        fontSize: 20,
        color: 'black',
        marginHorizontal: 10
    },
    TextIn: {
        fontSize: 18,
        color: 'black',
        marginHorizontal: 10
    },
    TextNum: {
        fontSize: 19,
        color: Color.header,
        marginHorizontal: 10,
        textAlign: 'right'
    }
})