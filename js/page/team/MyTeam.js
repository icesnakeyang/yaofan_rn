import React, {Component} from 'react'
import {
    View,
    Text,
    DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import actions from "../../action";
import InputRow from "../../common/component/InputRow";

class MyTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listTeam: []
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
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#ffff00',
            }}>
                <Text>my teams</Text>
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