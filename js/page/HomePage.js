import React, {Component} from 'react'
import {
    createAppContainer
} from 'react-navigation'
import {
    createBottomTabNavigator,
    BottomTabBar
} from 'react-navigation-tabs'
import {connect} from "react-redux";
import BottomTabs from './MainBottomBarPage'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.TABS = BottomTabs
    }

    _genBottomTab() {
        if (this.Tabs) {
            return this.Tabs
        }
        this.Tabs = createAppContainer(
            createBottomTabNavigator(
                this.TABS, {
                    tabBarComponent: props => {
                        return (
                            <BottomTabBar {...props}/>
                        )
                    }
                }
            )
        )
        return this.Tabs
    }

    render() {
        const Tab = this._genBottomTab()
        return (
            <Tab/>
        )
    }
}

const
    mapStateToProps = state => ({})

export default connect(mapStateToProps)(HomePage)