import {
    createStackNavigator
} from 'react-navigation-stack'
import {
    createSwitchNavigator
} from 'react-navigation'
import {createReactNavigationReduxMiddleware, createReduxContainer} from "react-navigation-redux-helpers";
import {connect} from "react-redux";
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import Login from "../page/login/Login";
import NewTask from "../page/task/NewTask";
import DateTimePicker from "../page/task/DateTimePicker";

export const rootCam = 'Init'

const InitNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: {
            header: null
        }
    }
})

const MainNavigator = createStackNavigator({
    HomePage: {
        screen: HomePage,
        navigationOptions: {
            header: null
        }
    },
    Login: {
        screen: Login,
        navigationOptions: {
            header: null
        }
    },
    NewTask: {
        screen: NewTask,
        navigationOptions: {
            header: null
        }
    },
    DateTimePicker:{
        screen:DateTimePicker,
        navigationOptions:{
            header:null
        }
    }
})

export const RootNavigator = createSwitchNavigator({
    Init: InitNavigator,
    Main: MainNavigator
})

export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
)

const AppWithNavigationState = createReduxContainer(
    RootNavigator,
    'root'
)

const mapStateToProps = state => ({
    state: state.nav
})

export default connect(mapStateToProps)(AppWithNavigationState)