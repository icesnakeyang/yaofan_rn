import React, {Component} from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native'
import Textarea from "react-native-textarea";
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import actions from "../../action";
import TouchButton from "../../common/component/TouchButton";
import Ionicons from 'react-native-vector-icons/Ionicons'


class ApplyTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: {},
            applyRemark: '',
            userName: '',
            editUserName: ''
        }
    }

    componentDidMount() {
        this._loadAllData()
    }

    _loadAllData() {
        if (this.props.navigation.state.params.teamId) {
            const {getTeamByTeamId} = this.props
            let params = {
                teamId: this.props.navigation.state.params.teamId,
                token: this.props.user.userInfo.token
            }
            getTeamByTeamId(params, (result) => {
                if (result) {
                    this.setState({
                        team: this.props.team.team,
                        userName: this.props.user.userInfo.name
                    })
                }
            })
        }

        if (this.props.navigation.state && this.props.navigation.state.params) {
            const teamId = this.props.navigation.state.params.teamId

        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    style={{
                        margin: 5, marginRight: 8
                    }}
                    onPress={() => {
                        this._submit()
                    }}
                >
                    <Ionicons
                        name={'ios-checkmark'}
                        size={36}
                        style={{color: this.props.theme.color.THEME_HEAD_TEXT}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    _submit() {
        if (!this.props.user.userInfo) {
            return
        }
        if (!this.props.team.team) {
            return
        }
        if (!this.state.applyRemark) {
            return
        }
        const {applyTeam} = this.props
        let params = {
            token: this.props.user.userInfo.token,
            teamId: this.props.team.team.teamId,
            remark: this.state.applyRemark
        }
        applyTeam(params, (result) => {
            if (result) {
            }
        })

    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('team.joinTeam')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
                {navigationBar}
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    marginTop: 10,
                    padding: 10
                }}>
                    <View style={{justifyContent: 'center', alignItems: 'center', borderBottomWidth: 0.5}}>
                        <Text style={{fontSize: 24}}>{this.state.team.teamName}</Text>
                    </View>
                    <View style={{margin: 10}}>
                        <Text>{this.state.team.description}</Text>
                    </View>
                </View>
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    marginTop: 10,
                    padding: 10
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'flex-end'
                    }}>
                        <View>
                            <Text style={{padding: 5}}>{I18nJs.t('team.applyUser')}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            borderBottomWidth: 1,
                            justifyContent: 'flex-end'
                        }}>
                            <TextInput
                                style={{padding: 0}}
                                defaultValue={this.state.userName}
                                onChangeText={(editUserName) => this.setState({editUserName})}
                            />
                        </View>
                    </View>
                    <View style={{
                        marginTop: 10
                    }}>
                        <Textarea
                            containerStyle={{
                                borderWidth: 1,
                                borderColor: this.props.theme.color.THEME_TAB_ICON_COLOR
                            }}
                            placeholder={I18nJs.t('team.applyRemarkHolder')}
                            onChangeText={(applyRemark) => this.setState({applyRemark})}
                        />
                    </View>
                </View>
                <View>
                    <TouchButton
                        touchFunction={() => {
                            this._submit()
                        }}
                        label={I18nJs.t('team.btApplyTeam')}
                    />
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user,
    team: state.team
})

const mapDispatchToProps = dispatch => ({
    getTeamByTeamId: (params, callback) => dispatch(actions.getTeamByTeamId(params, callback)),
    applyTeam: (params, callback) => dispatch(actions.applyTeam(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(ApplyTeam)