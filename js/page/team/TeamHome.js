import React, {Component} from 'react'
import {
    createAppContainer, NavigationActions
} from 'react-navigation'
import {
    createBottomTabNavigator,
    BottomTabBar
} from 'react-navigation-tabs'
import {connect} from "react-redux";
import {I18nJs} from "../../language/I18n";
import Ionicons from "react-native-vector-icons/Ionicons";
import CreateTeam from "./CreateTeam";
import MyTeam from "./MyTeam";
import TeamLog from "./TeamLog";
import {BackHandler} from "react-native";

class TeamHome extends Component {
    constructor(props) {
        super(props);
        this.TEAM_TABS = {
            CreateTeam: {
                screen: CreateTeam,
                navigationOptions: {
                    tabBarLabel: I18nJs.t('team.createTeam'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Ionicons
                            name={'ios-globe'}
                            size={26}
                            style={{color: tintColor}}
                        />
                    )
                }
            },
            MyTeam: {
                screen: MyTeam,
                navigationOptions: {
                    tabBarLabel: I18nJs.t('team.joinTeam'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Ionicons
                            name={'ios-globe'}
                            size={26}
                            style={{color: tintColor}}
                        />
                    )
                }
            },
            TeamLog: {
                screen: TeamLog,
                navigationOptions: {
                    tabBarLabel: I18nJs.t('team.joinTeam'),
                    tabBarIcon: ({tintColor, focused}) => (
                        <Ionicons
                            name={'ios-globe'}
                            size={26}
                            style={{color: tintColor}}
                        />
                    )
                }
            },
        }
    }

    _genBottomTab() {
        if (this.Tabs) {
            return this.Tabs
        }
        this.Tabs = createAppContainer(
            createBottomTabNavigator(this.TEAM_TABS, {
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
    theme: state.theme,
    user: state.user,
    team: state.team
})

export default connect(mapStateToProps)(TeamHome)