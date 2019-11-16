import {RootNavigator, rootCam} from "../navigator/AppNavigator";
import {combineReducers} from "redux";
import theme from './theme'
import user from './user'
import team from './team'
import task from './task'
import taskLog from './taskLog'
import complete from './complete'
import statistic from './statistic'
import point from './point'

const navState = RootNavigator.router.getStateForAction(
    RootNavigator.router.getActionForPathAndParams(rootCam)
)

const navReducer = (state = navState, action) => {
    const nextState = RootNavigator.router.getStateForAction(action, state)
    return nextState || state
}

const index = combineReducers({
    nav: navReducer,
    theme,
    user,
    team,
    task,
    taskLog,
    complete,
    statistic,
    point
})

export default index