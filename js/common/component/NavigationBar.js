import React, {Component} from 'react'
import {
    ViewPropTypes,
    View,
    Platform,
    StatusBar,
    Text
} from 'react-native'
import {PropTypes} from 'prop-types'
import {connect} from "react-redux";

const NAV_BAR_HEIGHT_IOS = 50
const NAV_BAR_HEIGHT_ANDROID = 0
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID
const STATUS_BAR_HEIGHT = (Platform.OS === 'ios') ? 33 : 0
const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT

const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    backgroundColor: PropTypes.string
}

class NavigationBar extends Component {
    static propTypes = {
        style: ViewPropTypes.style,
        title: PropTypes.string,
        titleView: PropTypes.element,
        titleLayoutStyle: ViewPropTypes.style,
        statusBar: PropTypes.shape(StatusBarShape),
        rightButton: PropTypes.element,
        leftButton: PropTypes.element
    }

    static defaultProps = {
        statusBar: {
            barStyle: 'light-content'
        }
    }

    render() {
        let statusBar = !this.props.statusBar.hidden ?
            <View style={{height: STATUS_BAR_HEIGHT}}>
                <StatusBar {...this.props.statusBar}/>
            </View> : null
        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode='head' numberOfLines={1}
                  style={{
                      fontSize: 22,
                      color: this.props.theme.color.THEME_HEAD_TEXT
                  }}>
                {this.props.title}
            </Text>
        let content = this.props.hide ? null :
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: NAVIGATION_BAR_HEIGHT
            }}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[{
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    left: 40,
                    right: 40,
                    top: 0,
                    bottom: 0
                }, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>

        return (
            <View style={[
                {backgroundColor: this.props.theme.color.THEME_HEAD_COLOR},
                this.props.style
            ]}>
                {statusBar}
                {content}
            </View>
        )
    }

    getButtonElement(data) {
        return (
            <View
                style={{
                    alignItems: 'center'
                }}
            >
                {data ? data : null}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(NavigationBar)