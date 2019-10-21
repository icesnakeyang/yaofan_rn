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
import {BackHandler} from "react-native";
import {I18nJs} from "../language/I18n";
import TaskPlaza from "./plaza/TaskPlaza";
import Ionicons from "react-native-vector-icons/Ionicons";
import TeamTasks from "./team/TeamTasks";
import MyTasks from "./task/MyTasks";
import Dashboard from "./reward/Dashboard";

const BottomTabs={
    Plaza: {
        screen: TaskPlaza,
        navigationOptions: {
            tabBarLabel: I18nJs.t('bottomBar.plaza'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-globe'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Team: {
        screen: TeamTasks,
        navigationOptions: {
            tabBarLabel: I18nJs.t('bottomBar.team'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-people'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    MyTasks: {
        screen: MyTasks,
        navigationOptions: {
            tabBarLabel: I18nJs.t('bottomBar.myTasks'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-checkbox-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            tabBarLabel: I18nJs.t('bottomBar.reward'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'logo-usd'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    }
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.TABS = BottomTabs
        I18nJs.locale='zh'
    }

    componentDidMount() {
        console.log(I18nJs.locale)
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
        console.log(this.state)
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