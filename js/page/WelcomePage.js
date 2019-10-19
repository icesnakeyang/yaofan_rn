import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";
import {I18nJs} from "../language/I18n";

class WelcomePage extends Component {
    constructor(props) {
        super(props);
        I18nJs.locale = 'zh'
    }

    componentDidMount() {
        this._init()
    }

    _init() {
        console.log(I18nJs.locale)
        I18nJs.locale = I18nJs.defaultLocale
        console.log(I18nJs.locale)

        const {loadLanguage} = this.props
        loadLanguage((result) => {
            I18nJs.local = result
        })
    }

    render() {
        console.log(this.props)
        console.log(I18nJs.defaultLocale)
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_HEAD_COLOR,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize: 32, color: this.props.theme.color.THEME_BACK_TEXT
                }}>{I18nJs.t('title')}</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)