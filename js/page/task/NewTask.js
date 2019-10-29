import React, {Component} from 'react'
import {
    View,
    Dimensions,
    TextInput,
    TouchableOpacity
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
            point: ''
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
        console.log(params)
        createTask(params, (result) => {
            console.log(result)
            if(result){
                NavigationUtil.goPage({}, 'MyTasks')
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
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    createTask: (params, callback) => dispatch(actions.createTask(params, callback))
})
export default connect(mapStateToProps, mapDispatchToProps)(NewTask)