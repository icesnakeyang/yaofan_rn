import React, {Component} from 'react'
import {
    View,
    TouchableOpacity,
    DeviceEventEmitter,
    FlatList
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from "react-redux";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import NavigationUtil from "../../navigator/NavigationUtil";
import actions from "../../action";
import TaskRow from "../../common/component/TaskRow";
import moment from "moment";

class TeamTasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        this._loadAllData()
        this.listener = DeviceEventEmitter.addListener('Refresh_TeamTasks', (params) => {
            this._loadAllData()
        })
    }

    componentWillUnmount() {
        this.listener.remove()
    }

    _loadAllData() {
        if (!(this.props.user && this.props.user.userInfo)) {
            return
        }
        let params = {
            token: this.props.user.userInfo.token
        }
        const {listBiddingTasks} = this.props
        listBiddingTasks(params, (result) => {
            if (result) {
                this.setState({
                    tasks: this.props.task.tasks
                })
            }
        })
    }

    getRightButton() {
        return (
            <View>
                <TouchableOpacity
                    style={{margin: 5, marginRight: 8}}
                    onPress={() => {
                        NavigationUtil.goPage({}, 'TeamHome')
                    }}
                >
                    <Ionicons
                        name={'ios-add'}
                        size={26}
                        style={{color: this.props.theme.color.THEME_HEAD_TEXT}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    _renderItem(item) {
        let endTime = ''
        if (item.endTime) {
            endTime = moment(item.endTime).format('YYYY-MM-DD H:mm')
        }
        return (
            <TaskRow
                touchFunction={() => {
                    NavigationUtil.goPage({taskId: item.taskId}, 'TaskDetail')
                }}
                title={item.title}
                point={item.point}
                endTime={endTime}
                status={item.status}
            />
        )
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <
                NavigationBar
                title={I18nJs.t('team.teamTask')}
                statusBar={statusBar}
                style={
                    {
                        backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
                    }
                }
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <FlatList
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.tasks}
                    renderItem={({item}) => this._renderItem(item)}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user,
    task: state.task
})

const mapDispatchToProps = dispatch => ({
    listBiddingTasks: (params, callback) => dispatch(actions.listBiddingTasks(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamTasks)