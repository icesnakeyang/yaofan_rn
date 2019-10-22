import React, {Component} from 'react'
import {
    View,
    TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import UserHeader from "./UserHeader";
import InputRow from "../../common/component/InputRow";

class Settings extends Component {
    getRightButton() {
        return (
            <View>
                <TouchableOpacity>

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
                title={I18nJs.t('bottomBar.me')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
            />
        )
        return (
            <View style={{flex: 1, backgroundColor: this.props.theme.color.THEME_BACK_COLOR}}>
                {navigationBar}
                <UserHeader/>
                <InputRow
                    touchFunction={() => {

                    }}
                    label={I18nJs.t('security.security')}
                    content={I18nJs.t('security.tip1')}
                    showLabel={true}
                />
                <InputRow
                    touchFunction={() => {

                    }}
                    label={I18nJs.t('settings.language')}
                    content={I18nJs.t(`settings.${I18nJs.locale}`)}
                    showLabel={true}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(Settings)