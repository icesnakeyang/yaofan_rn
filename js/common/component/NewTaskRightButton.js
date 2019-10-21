import React, {Component} from 'react'
import {
    View,
    TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";
import NavigationUtil from "../../navigator/NavigationUtil";

class NewTaskRightButton extends Component {
    render() {
        return (
            <View>
                <TouchableOpacity
                    style={{padding: 5, paddingRight: 8}}
                    onPress={() => {
                        NavigationUtil.goPage({}, 'NewTask')
                    }}
                >
                    <Ionicons
                        name={'ios-add'}
                        size={26}
                        style={{color: this.props.theme.color.THEME_HEAD_TEXT}}
                    />
                </TouchableOpacity>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(NewTaskRightButton)