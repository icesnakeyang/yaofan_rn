import React, {Component} from 'react'
import {
    View,
    Text,
    Dimensions,
    TextInput,
    TouchableOpacity,
    DeviceEventEmitter
} from 'react-native'
import Textarea from 'react-native-textarea'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import InputRow from "../../common/component/InputRow";
import NavigationUtil from "../../navigator/NavigationUtil";
import Ionicons from 'react-native-vector-icons/Ionicons'
import actions from "../../action";
import Toast from 'react-native-easy-toast'

class NewTask extends Component {
    constructor(props) {
        super(props);
        let {height, width} = Dimensions.get('window')
        this.state = {
            editDetail: '',
            title: '',
            height: height,
            width: width,
            endTime: '',
            point: '',
            teamId: '',
            teamName: ''
        }
    }

    componentDidMount() {
        this._loadAllData()
    }


    _loadAllData() {
        console.log(this.props)
        if (this.props.navigation.state.params && this.props.navigation.state.params.teamId) {
            this.setState({
                teamId: this.props.navigation.state.params.teamId,
                teamName: this.props.navigation.state.params.teamName
            })
        } else {
            this.setState({
                teamId: null,
                teamName: I18nJs.t('tasks.publicTask')
            })
        }

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
                        this._createTask()
                    }}
                >
                    <Ionicons
                        name={'ios-checkmark'}
                        size={36}
                        style={{color: this.props.theme.color.THEME_HEAD_TEXT}}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    _createTask() {
        console.log(this.state)
        console.log(this.props)

        let task = {
            endTime: this.props.navigation.state.params.endTime,
            title: this.state.title,
            detail: this.state.editDetail
        }

        console.log(task)

        const {createTask} = this.props
        let params = {
            token: this.props.user.userInfo.token,
            detail: task.detail,
            title: task.title,
            endTime: task.endTime,
            point: this.props.navigation.state.params.point
        }
        if (this.props.navigation.state.params.teamId) {
            params.teamId = this.props.navigation.state.params.teamId
        }
        console.log(params)
        createTask(params, (result) => {
            console.log(result)
            console.log(this.props)
            if (result) {
                DeviceEventEmitter.emit('Refresh_MyTasks')
                NavigationUtil.goPage({}, 'HomePage')
            } else {
                this.refs.toast.show(I18nJs.t('syserr.' + this.props.task.error))
            }
        })
    }

    render() {
        console.log(this.props)

        let statusBar = {
            backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
        }
        let navigationBar = (
            <NavigationBar
                title={I18nJs.t('tasks.newTask')}
                statusBar={statusBar}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                leftButton={this.getLeftButton()}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{flex: 1, backgroundColor: this.props.theme.color.THEME_BACK_COLOR}}>
                {navigationBar}
                <View style={{
                    marginTop: 20,
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: 14}}>{this.state.teamName}</Text>
                </View>
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    marginTop: 20,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <TextInput
                        style={{fontSize: 18}}
                        placeholder={I18nJs.t('tasks.taskTitleHolder')}
                        onChangeText={(title) => this.setState({title})}
                    />
                </View>
                <View>
                    <InputRow
                        label={I18nJs.t('tasks.point')}
                        content={this.props.navigation.state.params.point}
                        showLabel={true}
                        touchFunction={() => {
                            NavigationUtil.goPage({point: this.props.navigation.state.params.point}, 'TaskPoint')
                        }}
                    />
                </View>
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    marginTop: 20,
                    height: this.state.height - 400
                }}>
                    <Textarea
                        style={{padding: 10, fontSize: 16}}
                        placeholder={I18nJs.t('tasks.taskDetailHolder')}
                        onChangeText={(editDetail) => this.setState({editDetail})}
                    ></Textarea>
                </View>
                <View>
                    <InputRow
                        touchFunction={() => {
                            NavigationUtil.goPage({endTime: this.props.navigation.state.params.endTime}, 'DateTimePicker')
                        }}
                        label={I18nJs.t('tasks.setEndTime')}
                        content={this.props.navigation.state.params.endTime}
                        showLabel={true}
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
    task: state.task
})

const mapDispatchToProps = dispatch => ({
    createTask: (params, callback) => dispatch(actions.createTask(params, callback))
})
export default connect(mapStateToProps, mapDispatchToProps)(NewTask)