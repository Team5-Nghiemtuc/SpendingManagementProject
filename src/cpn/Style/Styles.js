import {
    Dimensions,
    StyleSheet
} from 'react-native';
import Color from './Color'
const { height, width } = Dimensions.get('window');

export default Style = StyleSheet.create({
    wapper: {
        backgroundColor: Color.header,
        justifyContent: 'space-around',
        flexDirection: 'row',
        alignItems: 'center',
        height: height * 10 / 100,
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%'
    },
    
})