import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import actions from "../../action";

class ApproveTeamApply extends Component {
    componentDidMount() {
        this._loadAllData()
    }

    _loadAllData() {
        console.log(this.props.navigation.state.params)
        let applyTeamId = this.props.navigation.state.params.applyId
        const {getApplyTeam} = this.props
        let params = {
            applyId:applyTeamId,
            token:this.props.user.userInfo.token
        }
        getApplyTeam(params, (result) => {
            if (result) {
                console.log(this.props)
            }
        })
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
                title={I18nJs.t('team.Approve')}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                statusBar={statusBar}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <Text>
                    Approve
                </Text>
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
    getApplyTeam: (params, callback) => dispatch(actions.getApplyTeam(params, callback))
})

export default connect(mapStateToProps)(ApproveTeamApply)