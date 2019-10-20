import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import {connect} from "react-redux";

class Dashboard extends Component {
    render() {
        return (
            <View>
                <Text>
                    this is dashboard
                </Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(Dashboard)

