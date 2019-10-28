import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import {getTeamByTeamId} from "../../action/team";
import moment from "moment";

class TeamDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: {}
        }
    }

    componentDidMount() {
        this._loadAllData()
    }

    _loadAllData() {
        console.log(this.props)
        if (!(this.props.navigation.state.params && this.props.navigation.state.params.teamId)) {
            return
        }
        const {getTeamByTeamId} = this.props
        let params = {
            teamId: this.props.navigation.state.params.teamId,
            token: this.props.user.userInfo.token
        }
        getTeamByTeamId(params, (result) => {
            console.log(result)
            if (result) {
                console.log(this.props)
                this.setState({
                    team: this.props.team.team
                })
            }
        })
    }


    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    _showData() {
        let showData = {
            teamName: '',
            createTime: '',
            managerName: '',
            description: ''
        }
        if (this.props.team.team) {
            if (this.props.team.team.createTime) {
                showData.createTime = moment(this.props.team.team.createTime).format('YYYY-MM-DD')
            }
            if (this.props.team.team.teamName) {
                showData.teamName = this.props.team.team.teamName
            }
            if (this.props.team.team.managerName) {
                showData.managerName = this.props.team.team.managerName
            }
            if (this.props.team.team.description) {
                showData.description = this.props.team.team.description
            }
        }
        return showData
    }

    render() {
        const showData = this._showData()
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('team.teamDetail')}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                statusBar={statusBar}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View style={{
                flex:1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
                {navigationBar}
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    marginTop:20,
                    justifyContent:'center',
                    alignItems:'center',
                    height:50
                }}>
                    <Text style={{fontSize:20}}>{showData.teamName}</Text>
                </View>
                <View style={{
                    flexDirection:'row',
                    justifyContent:'flex-end'
                }}>
                    <Text>{I18nJs.t('team.teamCreateDate')}</Text>
                    <Text>{showData.createTime}</Text>
                </View>
                <View>
                    <Text>{I18nJs.t('team.teamManager')}</Text>
                    <Text>{showData.managerName}</Text>
                </View>
                <View>
                    <Text>{showData.description}</Text>
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
    getTeamByTeamId: (params, callback) => dispatch(getTeamByTeamId(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail)
