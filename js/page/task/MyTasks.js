import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";

class MyTasks extends Component {
    render() {
        return (
            <View>
                <Text>
                    Girls get job down
                </Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(MyTasks)

