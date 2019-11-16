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


class TaskCompletePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskCompleteLogs: []
        }
    }

    componentDidMount() {
        this._loadAllData()
        this.listener = DeviceEventEmitter.addListener('Refresh_TaskCompletePage', (params) => {
            this._loadAllData()
        })
    }

    _loadAllData() {
        if (!this.props.task.data.task) {
            return
        }
        const {listTaskComplete} = this.props
        let params = {
            taskId: this.props.task.data.task.taskId,
            token: this.props.user.userInfo.token
        }
        listTaskComplete(params, (result) => {
            if (result) {
                this.setState({
                    taskCompleteLogs: this.props.complete.taskCompletes
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
                        NavigationUtil.goPage({}, 'NewTaskComplete')
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
                            <Text>{I18nJs.t('taskComplete.createTime')} </Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text>{logTime}</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', margin: 10}}>
                        <View>
                            <Text>{I18nJs.t('taskComplete.createUser')}</Text>
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
                            <Text>{I18nJs.t('taskComplete.readTime')}</Text>
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
        if (this.props.task.data) {
            if (this.props.task.data.task) {
                showData.title = this.props.task.data.task.title
            }
        }

        return showData
    }

    render() {
        let statusBar = {backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('taskComplete.title')}
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
                    keyExtractor={(item, index) => index.toString()}
                    data={this.state.taskCompleteLogs}
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
    complete: state.complete
})

const mapDispatchToProps = dispatch => ({
    listTaskComplete: (params, callback) => dispatch(actions.listTaskComplete(params, callback))

})

export default connect(mapStateToProps, mapDispatchToProps)(TaskCompletePage)