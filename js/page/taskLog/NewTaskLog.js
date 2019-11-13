import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions,
    DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import actions from "../../action";
import Textarea from "react-native-textarea";
import Toast from "react-native-easy-toast";
import TouchButton from "../../common/component/TouchButton";
import {create} from "react-native/jest/renderer";
import NavigationUtil from "../../navigator/NavigationUtil";

class NewTaskLog extends Component {
    constructor(props) {
        super(props);
        const {width, height} = Dimensions.get('window')
        this.state = {
            width: width,
            height: height,
            logContent: ''
        }


    }

    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    _saveLog() {
        if (!(this.props.user.userInfo && this.props.user.userInfo.token)) {
            this.refs.toast.show(I18nJs.t('common.tipSaveError'))
            return
        }
        if (!(this.props.task.task && this.props.task.task.taskId)) {
            this.refs.toast.show(I18nJs.t('common.tipSaveError'))
            return
        }
        if (!this.state.logContent) {
            this.refs.toast.show(I18nJs.t('taskLog.tipNoContent'))
            return
        }

        const {createTaskLog} = this.props
        let params = {
            token: this.props.user.userInfo.token,
            taskId: this.props.task.task.taskId,
            content: this.state.logContent
        }
        createTaskLog(params, (result) => {
            if (result) {
                this.refs.toast.show(I18nJs.t('taskLog.tipSaveSuccess'))
                DeviceEventEmitter.emit('Refresh_TaskLogPage')
                NavigationUtil.goPage({}, 'TaskLogPage')
            } else {
                this.refs.toast.show(I18nJs.t('syserr.' + this.props.taskLog.error))
            }
        })
    }

    render() {
        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('taskLog.createTaskLog')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
            />
        )

        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
                {navigationBar}
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    marginTop: 20,
                    padding: 10
                }}>
                    <View>
                        <Text style={{fontSize: 18}}>
                            {I18nJs.t('taskLog.logContent')}:
                        </Text>
                    </View>
                    <View style={{
                        marginTop: 10,
                        borderWidth: 0.5,
                        borderColor: '#b4a7a3',
                        padding: 10,
                        height: this.state.height - 300
                    }}>
                        <Textarea
                            placeholder={I18nJs.t('taskLog.logContentHolder')}
                            onChangeText={(logContent) => this.setState({logContent})}
                        />
                    </View>
                </View>

                <View>
                    <TouchButton
                        label={I18nJs.t('taskLog.btSaveLog')}
                        touchFunction={() => {
                            this._saveLog()
                        }}
                    />
                </View>

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
    taskLog: state.taskLog,
    task: state.task
})

const mapDispatchToProps = dispatch => ({
    createTaskLog: (params, callback) => dispatch(actions.createTaskLog(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(NewTaskLog)