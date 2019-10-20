import React, {Component} from 'react'
import {
    View,
    Text
} from 'react-native'
import GetLeftButton from "../../common/component/GetLeftButton";
import NavigationBar from "../../common/component/NavigationBar";
import {connect} from "react-redux";

class TaskPlaza extends Component {
    getLeftButton() {
        return (
            <GetLeftButton {...this.props}/>
        )
    }

    render() {
        let statusBar = {
            // backgroundColor: this.props.theme.color.THEME_HEAD_COLOR
            backgroundColor: '#ffff00'
        }
        let navigationBar = (
            <NavigationBar
                title={'次第要饭'}
                style={{backgroundColor: this.props.theme.color.THEME_HEAD_COLOR}}
                statusBar={statusBar}
                leftButton={this.getLeftButton()}
            />
        )
        return (
            <View>
                {navigationBar}
                <Text>task plaza</Text>
            </View>
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(TaskPlaza)