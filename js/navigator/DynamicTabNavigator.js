import React, {Component} from 'react'
import {
    createAppContainer
} from 'react-navigation'
import {
    BottomTabBar,
    createBottomTabNavigator
} from 'react-navigation-tabs'
import TaskPlaza from "../page/plaza/TaskPlaza";
import {I18nJs} from "../language/I18n";
import Ionicons from "react-native-vector-icons/Ionicons";
import TeamTasks from "../page/team/TeamTasks";
import MyTasks from "../page/task/MyTasks";
import Dashboard from "../page/reward/Dashboard";
import {connect} from "react-redux";

class DynamicTabNavigator extends Component {
    constructor(props) {
        super(props);
        this.TABS = {
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
    }

    _genBottomTab() {
        if (this.Tabs) {
            return this.Tabs
        }
        this.Tabs = createAppContainer(
            createBottomTabNavigator(this.TABS, {
                tabBarComponent: props => {
                    return (
                        <TabBarComponent
                            {...props}
                            theme={this.props.theme}
                        />
                    )
                }
            })
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
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor
        }
    }

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
    theme: state.theme
})

export default connect(mapStateToProps)(DynamicTabNavigator)