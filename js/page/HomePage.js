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
        const tintColor = this.props.theme.color.THEME_TAB_ICON_COLOR
        this.Tabs = createAppContainer(
            createBottomTabNavigator(
                this.TABS, {
                    tabBarComponent: tintColor => {
                        return (
                            <TabBarComponent
                                {...tintColor}
                                theme={this.props.theme}
                            />
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

class TabBarComponent extends Component {
    render() {
        return (
            <BottomTabBar
                {...this.props}
                activeTintColor={this.props.theme.color.THEME_TAB_ICON_COLOR}
            />
        )
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(HomePage)