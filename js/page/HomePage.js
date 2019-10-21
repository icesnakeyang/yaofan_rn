import React, {Component} from 'react'
import {
    NavigationActions
} from 'react-navigation'
import {connect} from "react-redux";
import {BackHandler} from "react-native";
import DynamicTabNavigator from "../navigator/DynamicTabNavigator";

class HomePage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', () => {
            const {nav, dispatch} = this.props
            if (nav.routes[1].index === 0) {
                return false
            }
            dispatch(NavigationActions.back())
            return true
        })
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress')
    }

    render() {
        return (
            <DynamicTabNavigator/>
        )
    }
}


const mapStateToProps = state => ({
    nav: state.nav
})

export default connect(mapStateToProps)(HomePage)