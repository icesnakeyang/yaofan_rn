import React, {Component} from 'react'
import {
    View,
    Text,
    FlatList
} from 'react-native'
import {connect} from "react-redux";
import actions from "../../action";
import InputRow from "../../common/component/InputRow";
import NavigationUtil from "../../navigator/NavigationUtil";

class TeamLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applyTeamList: []
        }
    }

    componentDidMount() {
        this._loadAllData()
    }

    _loadAllData() {
        if (!(this.props.user && this.props.user.userInfo)) {
            return
        }
        let params = {
            token: this.props.user.userInfo.token
        }
        const {listApplyTeam} = this.props
        listApplyTeam(params, (result) => {
            if (result) {
                this.setState({
                    applyTeamList: this.props.team.applyTeamList
                })
            }
        })
    }

    _renderItem(data) {
        let teamName = ''
        let managerName = ''
        if (data && data.item) {
            if (data.item.applyTeamName) {
                teamName = data.item.applyTeamName
            }
            if (data.item.applyUserName) {
                managerName = data.item.applyUserName
            }
        }
        return (
            <InputRow
                label={teamName}
                content={managerName}
                showLabel={true}
                touchFunction={() => {
                    if (data.item.applyUserId === this.props.user.userInfo.userId) {
                        NavigationUtil.goPage({
                            teamId: data.item.applyTeamId
                        }, 'TeamLogDetail')
                    }
                    if (data.item.managerId === this.props.user.userInfo.userId) {
                        NavigationUtil.goPage({
                            teamId: data.item.applyTeamId
                        }, 'ApproveTeamApply')
                    }
                }}
            />
        )
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: this.props.theme.color.THEME_BACK_COLOR}}>
                <FlatList
                    data={this.state.applyTeamList}
                    renderItem={(item) => (this._renderItem(item))}
                />
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
    listApplyTeam: (params, callback) => dispatch(actions.listApplyTeam(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamLog)