import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import NavigationBar from "../../common/component/NavigationBar";
import {connect} from "react-redux";
import {I18nJs} from "../../language/I18n";
import NewTaskRightButton from "../../common/component/NewTaskRightButton";

class TaskPlaza extends Component {
    componentDidMount() {
        this._init()
        I18nJs.locale = 'zh'
    }

    _init() {
    }

    getRightButton() {
        return (
            <NewTaskRightButton/>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('plaza.title')}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                statusBar={statusBar}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <Text>task plaza</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user
})

export default connect(mapStateToProps)(TaskPlaza)