import React, {Component} from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Dimensions,
    DeviceEventEmitter
} from 'react-native'
import {connect} from "react-redux";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from "../../navigator/NavigationUtil";
import actions from "../../action";
import TaskRow from "../../common/component/TaskRow";
import moment from "moment";

class MyTasks extends Component {
    constructor(props) {
        super(props);
        const {height, width} = Dimensions.get('window')
        this.state = {
            tasks: [],
            height: height,
            width: width,
            loading: true
        }
    }

    componentDidMount() {
        this._loadAllData()
        this.listener = DeviceEventEmitter.addListener('Refresh_MyTasks', (params) => {
            this._loadAllData()
        })
    }

    componentWillUnmount() {
        this.listener.remove()
    }


    _loadAllData() {
        const {listMyTasks} = this.props
        let params = {
            token: this.props.user.userInfo.token
        }
        listMyTasks(params, (result) => {
            if (result) {
                this.setState({
                    tasks: this.props.task.tasks
                })
                this.setState({
                    loading: false
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
                        NavigationUtil.goPage({}, 'SelectTeam')
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
            <NavigationBar
                title={I18nJs.t('tasks.myTasks')}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                statusBar={statusBar}
                rightButton={this.getRightButton()}
            />
        )
        return (
            <View style={{
                flex: 1,
                backgroundColor: this.props.theme.color.THEME_BACK_COLOR
            }}>
                {navigationBar}
                {this.state.loading ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>{I18nJs.t('loading')}</Text>
                    </View> :
                    <FlatList
                        data={this.state.tasks}
                        renderItem={({item}) => this._renderItem(item)}
                    />
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user,
    team: state.team,
    task: state.task
})

const mapDispatchToProps = dispatch => ({
    listMyTasks: (params, callback) => dispatch(actions.listMyTasks(params, callback))
})

export default connect(mapStateToProps, mapDispatchToProps)(MyTasks)

