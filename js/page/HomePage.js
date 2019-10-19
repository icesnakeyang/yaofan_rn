import React, {Component} from 'react'
import {
    View
} from 'react-native'
import {connect} from "react-redux";

class HomePage extends Component {
    render() {
        return (
            <View></View>
        )
    }
}

const mapStateToProps = state => ({})

export default connect(mapStateToProps)(HomePage)