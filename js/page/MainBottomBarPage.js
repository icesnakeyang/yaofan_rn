import React from "react";
import TaskPlaza from './plaza/TaskPlaza'
import TeamTasks from './team/TeamTasks'
import {connect} from "react-redux";
import Ionicons from 'react-native-vector-icons/Ionicons'
import {I18nJs} from "../language/I18n";

const MainBottomBarPage = {
    Plaza: {
        screen: TaskPlaza,
        navigationOptions: {
            tabBarLabel: I18nJs.t('bottomBar.plaza'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-journal'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Team: {
        screen: TeamTasks
    }
}

const mapStateToProps = state => ({
    theme: state.theme
})

export default connect(mapStateToProps)(MainBottomBarPage)
