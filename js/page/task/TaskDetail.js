import React, {Component} from 'react'
import {
    View,
    Text,
    DeviceEventEmitter,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import actions from "../../action";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import moment from "moment";
import TouchButton from "../../common/component/TouchButton";
import Toast from "react-native-easy-toast";
import NavigationUtil from "../../navigator/NavigationUtil";

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get('window')
        this.state = {
            data: null,
            height: height,
            width: width,
            grab: false,
            feedback: false,
        }
    }

    componentDidMount() {
        this._loadAllData()
    }

    _loadAllData() {
        if (this.props.navigation.state.params.taskId) {
            const {getTaskByTaskId} = this.props
            let params = {
                token: this.props.user.userInfo.token,
                taskId: this.props.navigation.state.params.taskId
            }
            getTaskByTaskId(params, (result) => {
                if (result) {
                    this.setState({
                        data: this.props.task.data,

                    })
                    if (this.state.data.task.status === 'BIDDING') {
                        if (this.state.data.task.createUserId !== this.props.user.userInfo.userId) {
                            this.setState({
                                grab: true
                            })
                        }
                    }
                    if (this.state.data.task.status === 'PROGRESS') {
                        this.setState({
                            feedback: true
                        })

                    }
                } else {
                    this.refs.toast.show(I18nJs.t('syserr.' + this.props.task.error))
                }
            })
        }
    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    _bidding() {
        if (!(this.props.user && this.props.user.userInfo)) {
            return
        }
        const {grabTask} = this.props
        let params = {
            token: this.props.user.userInfo.token,
            taskId: this.state.data.task.taskId
        }
        grabTask(params, (result) => {
            if (result) {
                this.refs.toast.show(I18nJs.t('tasks.tipBidSuccess'))
                DeviceEventEmitter.emit('Refresh_TaskPlaza')
                DeviceEventEmitter.emit('Refresh_TeamTasks')
                NavigationUtil.goPage({}, 'HomePage')
            }
        })
    }

    _showData() {
        let showData = {
            taskId: null,
            title: '',
            createTime: '',
            endTime: '',
            contractTime: '',
            createUserName: '',
            partyBName: '',
            status: '',
            point: '',
            detail: '',
            totalTaskLog: 0,
            totalUnreadTaskLog: 0
        }
        if (this.state.data) {
            if (this.state.data.task) {
                showData.taskId = this.state.data.task.taskId
                if (this.state.data.task.createTime) {
                    showData.createTime = moment(this.state.data.task.createTime).format('YYYY-MM-DD HH:mm')
                }
                if (this.state.data.task.endTime) {
                    showData.endTime = moment(this.state.data.task.endTime).format('YYYY-MM-DD HH:mm')
                }
                if (this.state.data.task.contractTime) {
                    showData.contractTime = moment(this.state.data.task.contractTime).format('YYYY-MM-DD HH:mm')
                }
                if (this.state.data.task.createUserName) {
                    showData.createUserName = this.state.data.task.createUserName
                }
                if (this.state.data.task.detail) {
                    showData.detail = this.state.data.task.detail
                }
                if (this.state.data.task.partyBName) {
                    showData.partyBName = this.state.data.task.partyBName
                }
                if (this.state.data.task.point) {
                    showData.point = this.state.data.task.point
                }
                if (this.state.data.task.title) {
                    showData.title = this.state.data.task.title
                }
                if (this.state.data.task.status) {
                    showData.status = this.state.data.task.status
                }
                if (this.state.data.totalTaskLog) {
                    showData.totalTaskLog = this.state.data.totalTaskLog
                }
                if (this.state.data.totalUnreadTaskLog) {
                    showData.totalUnreadTaskLog = this.state.data.totalUnreadTaskLog
                }
            }
        }
        return showData
    }

    render() {
        const showData = this._showData()
        let statusBar = {backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}
        let navigationBar = (
            <NavigationBar
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                title={I18nJs.t('tasks.taskDetail')}
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
                {showData.taskId ?
                    <View>
                        <View style={{
                            backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                            marginTop: 20,
                            height: 50,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text style={{fontSize: 20}}>{showData.title}</Text>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            padding: 10
                        }}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#359b4f',
                                        padding: 5
                                    }}
                                    onPress={() => {
                                        NavigationUtil.goPage({taskId: showData.taskId}, 'TaskLogPage')
                                    }}
                                >
                                    <Text
                                        style={{color: '#f4f6ff'}}>{I18nJs.t('taskLog.log') + '：' + showData.totalTaskLog}</Text>
                                </TouchableOpacity>
                                {showData.totalUnreadTaskLog ?
                                    <View style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: '#f90c04',
                                        borderRadius: 100,
                                        marginLeft: -6,
                                        marginTop: -8
                                    }}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#ffffff',
                                            marginLeft: 4
                                        }}>{showData.totalUnreadTaskLog}</Text>
                                    </View>
                                    : null}
                                <TouchableOpacity
                                    style={{
                                        marginLeft: 10,
                                        backgroundColor: '#1093cc',
                                        padding: 5
                                    }}
                                    onPress={() => {
                                        NavigationUtil.goPage({taskId: showData.taskId}, 'TaskCompletePage')
                                    }}
                                >
                                    <Text
                                        style={{color: '#f4f6ff'}}>{I18nJs.t('taskLog.complete') + '：' + showData.totalTaskLog}</Text>
                                </TouchableOpacity>
                                {showData.totalUnreadTaskLog ?
                                    <View style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: '#f90c04',
                                        borderRadius: 100,
                                        marginLeft: -6,
                                        marginTop: -8
                                    }}>
                                        <Text style={{
                                            fontSize: 12,
                                            color: '#ffffff',
                                            marginLeft: 4
                                        }}>{showData.totalUnreadTaskLog}</Text>
                                    </View>
                                    : null}
                            </View>
                        </View>

                        <View style={{
                            marginTop: 10,
                            backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                            flexDirection: 'row',
                            alignItems: 'center',
                            height: 50
                        }}>
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Text>{I18nJs.t('tasks.createTime')}:</Text>
                            </View>
                            <View style={{flex: 1, paddingLeft: 10}}>
                                <Text>{showData.createTime}</Text>
                            </View>
                        </View>

                        {/*完成时间*/}
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                            alignItems: 'center',
                            height: 50
                        }}>
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Text>{I18nJs.t('tasks.endTime')}:</Text>
                            </View>
                            <View style={{flex: 1, paddingLeft: 10}}>
                                <Text>{showData.endTime}</Text>
                            </View>
                        </View>

                        {/*甲方*/}
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                            height: 50,
                            alignItems: 'center',
                        }}>
                            <View style={{
                                flex: 1,
                                alignItems: 'flex-end'
                            }}>
                                <Text>{I18nJs.t('tasks.partyA')}：</Text>
                            </View>
                            <View style={{
                                flex: 1
                            }}>
                                <Text>{showData.createUserName}</Text>
                            </View>
                        </View>

                        {/*乙方*/}
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                            height: 50,
                            alignItems: 'center',
                        }}>
                            <View style={{
                                flex: 1,
                                alignItems: 'flex-end'
                            }}>
                                <Text>{I18nJs.t('tasks.partyB')}：</Text>
                            </View>
                            <View style={{
                                flex: 1
                            }}>
                                <Text>{showData.partyBName}</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                            height: 50,
                            marginTop: 10,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View>
                                <Text>{I18nJs.t('tasks.grabTime')}:</Text>
                            </View>
                            <View style={{marginLeft: 10}}>
                                <Text>{showData.contractTime}</Text>
                            </View>
                        </View>

                        {/*状态*/}
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                            alignItems: 'center',
                            height: 50
                        }}>
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Text>{I18nJs.t('tasks.status')}：</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text>{showData.status}</Text>
                            </View>
                        </View>

                        {/*积分*/}
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 10,
                            backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                            alignItems: 'center',
                            height: 50
                        }}>
                            <View style={{flex: 1, alignItems: 'flex-end'}}>
                                <Text>积分：</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text>{showData.point}</Text>
                            </View>
                        </View>

                        {/*详情*/}
                        <View style={{
                            marginTop: 10,
                            backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                            padding: 20
                        }}>
                            <Text>{showData.detail}</Text>
                        </View>
                        {/*抢单按钮*/}
                        {this.state.grab ?
                            <View>
                                <TouchButton
                                    touchFunction={() => {
                                        this._bidding()
                                    }}
                                    style={{height: 50}}
                                    label={I18nJs.t('tasks.btBid')}
                                />
                            </View>
                            : null
                        }
                    </View>
                    :
                    <View style={{justifyContent: 'center', alignItems: 'center', height: this.state.height}}>
                        <Text>{I18nJs.t('loading')}</Text>
                    </View>
                }
                <Toast
                    ref={'toast'}
                    position={'center'}
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
    getTaskByTaskId: (params, callback) => dispatch(actions.getTaskByTaskId(params, callback)),
    grabTask: (params, callback) => dispatch(actions.grabTask(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail)