import React, {Component} from 'react'
import {
    createAppContainer,
    NavigationActions
} from 'react-navigation'
import {
    createBottomTabNavigator,
    BottomTabBar
} from 'react-navigation-tabs'
import {connect} from "react-redux";
import BottomTabs from './MainBottomBarPage'
import {BackHandler} from "react-native";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.TABS = BottomTabs
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const {nav, dispatch} = this.props
            if (nav.routes[1].index === 0) {
                return false
            }
            dispatch(NavigationActions.back())
            return true
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress')
    }


    _genBottomTab() {
        if (this.Tabs) {
            return this.Tabs
        }
        const tintColor = this.props.theme.color.THEME_TAB_ICON_COLOR
        this.Tabs = createAppContainer(
            createBottomTabNavigator(
                this.TABS, {
                    tabBarComponent: tintColor => {
                        return (
                            <TabBarComponent
                                {...tintColor}
                                theme={this.props.theme}
                            />
                        )
                    }
                }
            )
        )
        return this.Tabs
    }

    render() {
        const Tab = this._genBottomTab()
        return (
            <Tab/>
        )
    }
}

class TabBarComponent extends Component {
    render() {
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.props.theme.color.THEME_TAB_ICON_COLOR}
            />
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    nav: state.nav
})

export default connect(mapStateToProps)(HomePage)