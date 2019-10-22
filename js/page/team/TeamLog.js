import React, {Component} from 'react'
import {
    View
} from 'react-native'
import {connect} from "react-redux";

class TeamLog extends Component {
    render() {
        return (
            <View></View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme,
    user: state.user
})

export default connect(mapStateToProps)(TeamLog)