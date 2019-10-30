import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";
import actions from "../../action";

class TaskDetail extends Component {
    componentDidMount() {
        this._loadAllData()
    }


    _loadAllData() {
        console.log(this.props)
        if (this.props.navigation.state.params.taskId) {
            const {getTaskByTaskId} = this.props
            let params = {
                token: this.props.user.userInfo.token,
                taskId: this.props.navigation.state.params.taskId
            }
            getTaskByTaskId(params, (result) => {
                console.log(result)
                if (result) {
                    console.log(this.props)
                }
            })
        }
    }

    render() {
        return (
            <View>
                <Text>task detail</Text>
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