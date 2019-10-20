import React, {Component} from 'react'
import {
    TouchableOpacity
} from 'react-native'
import NavigationUtil from "../../navigator/NavigationUtil";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";

class GetLeftButton extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{padding: 8, paddingLeft: 12}}
                onPress={() => {
                    NavigationUtil.goBack(this.props.navigation)
                }}
            >
                <Ionicons
                    name={'ios-arrow-back'}
                    size={26}
                    style={{color: this.props.theme.color.THEME_HEAD_TEXT}}
                />
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(GetLeftButton)