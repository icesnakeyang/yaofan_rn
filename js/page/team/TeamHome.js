import React, {Component} from 'react'
import {
    View,
} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {connect} from "react-redux";
import CreateTeam from "./CreateTeam";
import JoinTeam from "./JoinTeam";
import TeamLog from "./TeamLog";
import {I18nJs} from "../../language/I18n";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import MyTeam from "./MyTeam";

class TeamHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTeam: []
        }
        this.TopTab = {
            MyTeam:{
                screen:MyTeam,
                navigationOptions:{
                    title:I18nJs.t('team.myTeam')
                }
            },
            Tab1: {
                screen: CreateTeam,
                navigationOptions: {
                    title: I18nJs.t('team.createTeam')
                }
            },
            Tab2: {
                screen: JoinTeam,
                navigationOptions: {
                    title: I18nJs.t('team.joinTeam')
                }
            },
            Tab3: {
                screen: TeamLog,
                navigationOptions: {
                    title: I18nJs.t('team.teamLog')
                }
            }
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('team.myTeam')}
                statusBar={statusBar}
                style={{
                    backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
                }}
                leftButton={this.getLeftButton()}
            />
        )
        const TopTab = createAppContainer(
            createMaterialTopTabNavigator(
                this.TopTab
            )
        )
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ffff00',
            }}>
                {navigationBar}
                <TopTab/>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(TeamHome)