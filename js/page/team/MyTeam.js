import React, {Component} from 'react'
import {
    View,
    Text,
    DeviceEventEmitter
} from 'react-native'
import {createAppContainer} from 'react-navigation'
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {connect} from "react-redux";
import CreateTeam from "./CreateTeam";
import JoinTeam from "./JoinTeam";
import TeamLog from "./TeamLog";
import {I18nJs} from "../../language/I18n";
import GetLeftButton from "../../common/component/GetLeftButton";
import actions from "../../action";
import NavigationBar from "../../common/component/NavigationBar";

class MyTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTeam: []
        }
        this.TopTab = {
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

    componentDidMount() {
        this._loadAllData()
        this.listener = DeviceEventEmitter.addListener('Refresh_MyTeam', (params) => {
            this._loadAllData()
        })
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    _loadAllData() {
        console.log(this.props)
        if (!this.props.user.userInfo) {
            return
        }
        const {listTeam} = this.props
        let params = {
            token: this.props.user.userInfo.token
        }
        listTeam(params, (result) => {
            if (result) {
                this.setState({
                    teamList: this.props.team.teams
                })
            }
        })
    }

    _renderItem(data) {
        console.log(data)
        let teamName = ''
        let managerName = ''
        if (data && data.item) {
            if (data.item.teamName) {
                teamName = data.item.teamName
            }
            if (data.item.managerName) {
                managerName = data.item.managerName
            }
        }
        return (
            <InputRow
                label={teamName}
                content={managerName}
                showLabel={true}
            />
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
        console.log(5)
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

class TeamTab extends Component {
    render() {
        return (
            <View style={{backgroundColor: '#ff00ff'}}>
                <Text>my tab</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    listTeam: (params, callback) => dispatch => (actions.listTeam(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyTeam)