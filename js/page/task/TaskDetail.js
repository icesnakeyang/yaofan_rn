import React, {Component} from 'react'
import {
    View,
    Text,
    RefreshControl
} from 'react-native'
import {connect} from "react-redux";
import actions from "../../action";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import moment from "moment";
import TouchButton from "../../common/component/TouchButton";

class TaskDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            task: {}
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
                        task: this.props.task.task
                    })
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
        console.log(this.state)
        console.log(this.props)
    }

    _showData() {
        let showData = {
            createTime: '',
            endTime: ''
        }
        if (this.state.task) {
            if (this.state.task.createTime) {
                showData.createTime = moment(this.state.task.createTime).format('YYYY-MM-DD HH:mm')
            }
            if (this.state.task.endTime) {
                showData.endTime = moment(this.state.task.endTime).format('YYYY-MM-DD HH:mm')
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
                {/*标题*/}
                <View style={{
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    marginTop: 20,
                    height: 50,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{fontSize: 20}}>{this.state.task.title}</Text>
                </View>

                {/*发布时间*/}
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
                        <Text>{this.state.task.createUserName}</Text>
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
                        <Text>{this.state.task.status}</Text>
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
                        <Text>{this.state.task.point}</Text>
                    </View>
                </View>

                {/*详情*/}
                <View style={{
                    marginTop: 10,
                    backgroundColor: this.props.theme.color.THEME_ROW_COLOR,
                    padding: 20
                }}>
                    <Text>{this.state.task.detail}</Text>
                </View>
                {/*抢单按钮*/}
                {this.state.task.taskId ?
                    <View>
                        <TouchButton
                            touchFunction={() => {
                                this._bidding()
                            }}
                            style={{height: 50}}
                            label={'抢单'}
                        />
                    </View>
                    : null
                }
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
    getTaskByTaskId: (params, callback) => dispatch(actions.getTaskByTaskId(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskDetail)