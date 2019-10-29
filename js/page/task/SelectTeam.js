import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import actions from "../../action";
import NavigationUtil from "../../navigator/NavigationUtil";

class SelectTeam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    componentDidMount() {
        this._loadAllData()
    }

    _loadAllData() {
        const {listTeam} = this.props
        let params = {
            token: this.props.user.userInfo.token
        }
        listTeam(params, (result) => {
            if (result) {
                console.log(this.props)
                this.setState({
                    teams: this.props.team.teams
                })
            }
        })
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    _renderItem(item) {
        return (
            <TouchableOpacity
                style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    marginTop: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50
                }}
                onPress={() => {
                    NavigationUtil.goPage({
                        teamId: item.teamId,
                        teamName: item.teamName
                    }, 'NewTask')
                }}
            >
                <Text style={{fontSize: 20}}>{item.teamName}</Text>
            </TouchableOpacity>
        )
    }

    render() {
        let statusBar = {backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('tasks.selectTeam')}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                statusBar={statusBar}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
                {navigationBar}
                <TouchableOpacity
                    style={{
                        backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                        marginTop: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 50
                    }}
                    onPress={() => {
                        NavigationUtil.goPage({}, 'NewTask')
                    }}
                >
                    <Text style={{fontSize: 20}}>{I18nJs.t('tasks.publicTask')}</Text>
                </TouchableOpacity>
                <FlatList

                    data={this.state.teams}
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
export default connect(mapStateToProps, mapDispatchToProps)(SelectTeam)
