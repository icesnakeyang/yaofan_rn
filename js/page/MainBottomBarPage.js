import React from "react";
import TaskPlaza from './plaza/TaskPlaza'
import TeamTasks from './team/TeamTasks'
import MyTasks from './task/MyTasks'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {I18nJs} from "../language/I18n";
import Dashboard from "./reward/Dashboard";

export default {
    Plaza: {
        screen: TaskPlaza,
        navigationOptions: {
            tabBarLabel: I18nJs.t('bottomBar.plaza'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-globe'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Team: {
        screen: TeamTasks,
        navigationOptions: {
            tabBarLabel: I18nJs.t('bottomBar.team'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-people'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    MyTasks: {
        screen: MyTasks,
        navigationOptions: {
            tabBarLabel: I18nJs.t('bottomBar.myTasks'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'ios-checkbox-outline'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            tabBarLabel: I18nJs.t('bottomBar.reward'),
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'logo-usd'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    }
}