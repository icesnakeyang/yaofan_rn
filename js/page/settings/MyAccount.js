import React, {Component} from 'react'
import {
    View
} from 'react-native'
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import {connect} from "react-redux";
import InputRow from "../../common/component/InputRow";
import NavigationUtil from "../../navigator/NavigationUtil";
import GetLeftButton from "../../common/component/GetLeftButton";
import TouchButton from "../../common/component/TouchButton";

class MyAccount extends Component {

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    _renderData() {
        let renderData = {
            username: I18nJs.t('myAccount.nameTip')
        }
        if (this.props.user.userInfo && this.props.user.userInfo.name) {
            renderData.username = this.props.user.userInfo.name
        }
        return renderData
    }

    render() {
        let renderData = this._renderData()
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('settings.myAccount')}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                statusBar={statusBar}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <InputRow
                    label={I18nJs.t('myAccount.name')}
                    showLabel={true}
                    content={renderData.username}
                    touchFunction={() => {
                        NavigationUtil.goPage({}, 'Username')
                    }}
                />
                <TouchButton
                    label={I18nJs.t('myAccount.changUser')}
                    touchFunction={() => {
                        NavigationUtil.goPage({}, 'Login')
                    }}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user
})

export default connect(mapStateToProps)(MyAccount)