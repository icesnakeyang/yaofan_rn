import React, {Component} from 'react'
import {
    FlatList,
    Text,
    View,
    DeviceEventEmitter
} from 'react-native'
import NavigationBar from "../../common/component/NavigationBar";
import {connect} from "react-redux";
import {I18nJs} from "../../language/I18n";
import NewTaskRightButton from "../../common/component/NewTaskRightButton";
import actions from "../../action";
import moment from "moment";
import TaskRow from "../../common/component/TaskRow";
import NavigationUtil from "../../navigator/NavigationUtil";

class TaskPlaza extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        this._loadAllData()
        this.listener = DeviceEventEmitter.addListener('Refresh_TaskPlaza', (params) => {
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
            <NewTaskRightButton/>
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
            <NavigationBar
                title={I18nJs.t('plaza.title')}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                statusBar={statusBar}
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

export default connect(mapStateToProps, mapDispatchToProps)(TaskPlaza)