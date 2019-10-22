import React, {Component} from 'react'
import {
    View,
    DeviceEventEmitter,
    FlatList
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import TouchButton from "../../common/component/TouchButton";
import NavigationUtil from "../../navigator/NavigationUtil";
import actions from "../../action";
import InputRow from "../../common/component/InputRow";

class MyTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamList: []
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
        console.log('myteam')
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
                console.log(this.state)
            }
        })
    }

    _renderItem(data) {
        console.log(data)
        return (
            <InputRow
                label={data.item.teamName}
                content={data.item.managerName}
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
        return (
            <View>
                {navigationBar}
                <FlatList
                    data={this.state.teamList}
                    renderItem={(item) => (this._renderItem(item))}
                />
                <TouchButton
                    label={I18nJs.t('team.joinTeam')}
                    touchFunction={() => {
                        NavigationUtil.goPage({}, 'JoinTeam')
                    }}
                />
                <TouchButton
                    label={I18nJs.t('team.createTeam')}
                    touchFunction={() => {
                        NavigationUtil.goPage({}, 'CreateTeam')
                    }}
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
    listTeam: (params, callback) => dispatch(actions.listTeam(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyTeam)