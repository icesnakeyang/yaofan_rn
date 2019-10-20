import React, {Component} from 'react'
import {
    ViewPropTypes,
    View,
    StyleSheet,
    Platform,
    StatusBar,
    Text
} from 'react-native'
import {PropTypes} from 'prop-types'

const NAV_BAR_HEIGHT_IOS = 50
const NAV_BAR_HEIGHT_ANDROID = 0
const NAV_BAR_HEIGHT = Platform.OS === 'ios' ? NAV_BAR_HEIGHT_IOS : NAV_BAR_HEIGHT_ANDROID
const STATUS_BAR_HEIGHT = (Platform.OS === 'ios') ? 33 : 0
// const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT
const NAVIGATION_BAR_HEIGHT = NAV_BAR_HEIGHT

const StatusBarShape = {
    barStyle: PropTypes.oneOf(['light-content', 'default']),
    backgroundColor: PropTypes.string
}
export default class NavigationBar extends Component {
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
            <View style={styles.statusBar}>
                <StatusBar {...this.props.statusBar}/>
            </View> : null
        let titleView = this.props.titleView ? this.props.titleView :
            <Text ellipsizeMode='head' numberOfLines={1}
                  style={styles.title}>
                {this.props.title}
            </Text>
        let content = this.props.hide ? null :
            <View style={styles.navBar}>
                {this.getButtonElement(this.props.leftButton)}
                <View style={[styles.navBarTitleContainer, this.props.titleLayoutStyle]}>
                    {titleView}
                </View>
                {this.getButtonElement(this.props.rightButton)}
            </View>

        return (
            <View style={[styles.container, this.props.style]}>
                {statusBar}
                {content}
            </View>
        )
    }

    getButtonElement(data) {
        return (
            <View
                style={styles.navBarButton}
            >
                {data ? data : null}
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

const styles = StyleSheet.create({
    container: {
        backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
    },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: NAVIGATION_BAR_HEIGHT

    },
    title: {
        fontSize: 22,
        color: '#ff0000'
    },
    navBarButton: {
        alignItems: 'center'
    },
    navBarTitleContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 40,
        right: 40,
        top: 0,
        bottom: 0
    },
    statusBar: {
        height: STATUS_BAR_HEIGHT
    }
})