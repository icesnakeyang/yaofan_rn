import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";
import {I18nJs} from "../language/I18n";
import actions from "../action";
import NavigationUtil from "../navigator/NavigationUtil";
import {autoLogin} from "../action/user/login";

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        // I18nJs.locale = 'zh'
    }

    componentDidMount() {
        NavigationUtil.navigation = this.props.navigation
        this._init()
    }

    _init() {
        I18nJs.locale = I18nJs.defaultLocale

        const {loadLanguage} = this.props
        loadLanguage((result) => {
            if (result) {

            }
        })

        const {autoLogin} = this.props

        autoLogin((result) => {
            if (this.props.user.userInfo) {
                NavigationUtil.goPage({}, 'HomePage')
            } else {
            }
        })

        return true
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_HEAD_COLOR,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 32, color: this.props.theme.color.THEME_HEAD_TEXT
                }}>{I18nJs.t('title')}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    loadLanguage: (callback) => dispatch(actions.loadLanguage(callback)),
    autoLogin: (callback) => dispatch(actions.autoLogin(callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)