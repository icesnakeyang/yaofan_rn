import React, {Component} from 'react'
import {
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native'
import {connect} from "react-redux";
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {I18nJs} from "../../language/I18n";
import Ionicons from 'react-native-vector-icons/Ionicons'
import NavigationUtil from "../../navigator/NavigationUtil";


class TaskLogPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            taskLogs: []
        }
    }

    componentDidMount() {
        this._loadAllData()
    }

    _loadAllData() {
        console.log(this.props)
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
                            <Text> 日志日期 </Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text>2019-11-12 11:24</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', margin: 10}}>
                        <View>
                            <Text>创建人</Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text>gogoyang</Text>
                        </View>
                    </View>
                    <View style={{flexDirection: 'row', borderWidth: 0.5, margin: 10, padding: 10}}>
                        <Text>日志内容</Text>
                    </View>
                    <View style={{flexDirection: 'row', margin: 10}}>
                        <View>
                            <Text>阅读时间</Text>
                        </View>
                        <View style={{marginLeft: 10}}>
                            <Text>2018-1-12</Text>
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

export default connect(mapStateToProps)(TaskLogPage)