import React, {Component} from 'react'
import {
    View,
    TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import NavigationUtil from "../../navigator/NavigationUtil";

class TeamTasks extends Component {

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    style={{margin: 5, marginRight: 8}}
                    onPress={() => {
                        console.log(1)
                        NavigationUtil.goPage({}, 'TeamHome')
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

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('team.teamTask')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})
export default connect(mapStateToProps)(TeamTasks)