import React, {Component} from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from "../../navigator/NavigationUtil";
import actions from "../../action";
import moment from "moment";


class TaskLogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskLogs: []
        }
    }

    componentDidMount() {
        this._loadAllData()
        this.listener = DeviceEventEmitter.addListener('Refresh_TaskLogPage', (params) => {
            this._loadAllData()
        })
    }

    _loadAllData() {
        if (!this.props.task.task) {
            return
        }
        const {listTaskLog} = this.props
        let params = {
            taskId: this.props.task.task.taskId,
            token: this.props.user.userInfo.token
        }
        listTaskLog(params, (result) => {
            if (result) {
                this.setState({
                    taskLogs: this.props.taskLog.taskLogs
                })
            }
        })
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
                    style={{margin: 5, marginRight: 8}}
                    onPress={() => {
                        NavigationUtil.goPage({}, 'NewTaskLog')
                    }}
                >
                    <Ionicons
                        name={'ios-add'}
                        size={36}
                        style={{color: this.props.theme.color.THEME_HEAD_TEXT}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    _renderItem(item) {
        let logTime = ''
        let createUser = ''
        let readTime = ''
        if (item.createTime) {
            logTime = moment(item.createTime).format('YYYY-MM-DD HH:mm')
        }
        if (item.createUserName) {
            createUser = item.createUserName
        }
        if (item.readTime) {
            readTime = moment(item.readTime).format('YYYY-MM-DD HH:mm')
        } else {
            readTime = I18nJs.t('status.unRead')
        }
        return (
            <View>
                <View style={{
                    marginTop: 20,
                    backgroundColor:
                    this.props.theme.color.THEME_ROW_COLOR
                }}>
                    <View
                        style={{flexDirection: 'row', margin: 10}}>
                        <View>
                            <Text>{I18nJs.t('taskLog.logTime')} </Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text>{logTime}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', margin: 10}}>
                        <View>
                            <Text>{I18nJs.t('taskLog.createUser')}</Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text>{createUser}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', borderWidth: 0.5, margin: 10, padding: 10}}>
                        <Text>{item.content}</Text>
                    </View>
                    <View style={{flexDirection: 'row', margin: 10}}>
                        <View>
                            <Text>{I18nJs.t('taskLog.readTime')}</Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text>{readTime}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    _showData() {
        let showData = {
            title: ''
        }
        if (this.props.task.task) {
            if (this.props.task.task.title) {
                showData.title = this.props.task.task.title
            }
        }

        return showData
    }

    render() {
        let statusBar = {backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('taskLog.title')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        const showData = this._showData()
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
                {navigationBar}
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 50,
                    marginTop: 20
                }}>
                    <Text style={{fontSize: 20}}>{showData.title}</Text>
                </View>
                <FlatList
                    data={this.state.taskLogs}
                    renderItem={({item}) => this._renderItem(item)}
                />
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user,
    task: state.task,
    taskLog: state.taskLog
})

const mapDispatchToProps = dispatch => ({
    listTaskLog: (params, callback) => dispatch(actions.listTaskLog(params, callback))

})

export default connect(mapStateToProps, mapDispatchToProps)(TaskLogPage)