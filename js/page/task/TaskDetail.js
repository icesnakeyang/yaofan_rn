import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";

class TaskDetail extends Component {
    componentDidMount(){
        this._loadAllData()
    }


    _loadAllData(){
        console.log(this.props)
        if(this.props.navigation.state.params.taskId){

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
    theme: state.theme
})

export default connect(mapStateToProps)(TaskDetail)