import React, {Component} from 'react'
import {
    View,
    DeviceEventEmitter,
    FlatList
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
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

    componentWillUnmount() {
        this.listener.remove()
    }


    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    _loadAllData() {
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
        let teamName = ''
        let managerName = ''
        if (data) {
            if (data.teamName) {
                teamName = data.teamName
            }
            if (data.managerName) {
                managerName = data.managerName
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
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
                <FlatList
                    data={this.state.teamList}
                    renderItem={({item}) => this._renderItem(item)}
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