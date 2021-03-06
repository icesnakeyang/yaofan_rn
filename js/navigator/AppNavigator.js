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
import MyAccount from "../page/settings/MyAccount";
import Register from "../page/login/Register";
import Username from "../page/settings/Username";
import CreateTeam from "../page/team/CreateTeam";
import MyTeam from "../page/team/MyTeam";
import TeamLog from "../page/team/TeamLog";
import TeamHome from "../page/team/TeamHome";
import JoinTeam from "../page/team/JoinTeam";
import ApplyTeam from "../page/team/ApplyTeam";
import TeamLogDetail from "../page/team/TeamLogDetail";
import ApplyUserList from "../page/team/ApplyUserList";
import ApproveTeamApply from "../page/team/ApproveTeamApply";
import TeamDetail from "../page/team/TeamDetail";
import TaskPoint from "../page/task/TaskPoint";
import SelectTeam from "../page/task/SelectTeam";
import TaskDetail from "../page/task/TaskDetail";
import TaskLogPage from "../page/taskLog/TaskLogPage";
import NewTaskLog from "../page/taskLog/NewTaskLog";
import TaskCompletePage from "../page/complete/TaskCompletePage";
import NewTaskComplete from "../page/complete/NewTaskComplete";
import PointExchangePage from "../page/reward/PointExchangePage";
import Dashboard from "../page/reward/Dashboard";

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
    DateTimePicker: {
        screen: DateTimePicker,
        navigationOptions: {
            header: null
        }
    },
    MyAccount: {
        screen: MyAccount,
        navigationOptions: {
            header: null
        }
    },
    Register: {
        screen: Register,
        navigationOptions: {
            header: null
        }
    },
    Username: {
        screen: Username,
        navigationOptions: {
            header: null
        }
    },
    CreateTeam: {
        screen: CreateTeam,
        navigationOptions: {
            header: null
        }
    },
    MyTeam: {
        screen: MyTeam,
        navigationOptions: {
            header: null
        }
    },
    TeamLog: {
        screen: TeamLog,
        navigationOptions: {
            header: null
        }
    },
    TeamHome: {
        screen: TeamHome,
        navigationOptions: {
            header: null
        }
    },
    JoinTeam: {
        screen: JoinTeam,
        navigationOptions: {
            header: null
        }
    },
    ApplyTeam: {
        screen: ApplyTeam,
        navigationOptions: {
            header: null
        }
    },
    TeamLogDetail: {
        screen: TeamLogDetail,
        navigationOptions: {
            header: null
        }
    },
    ApplyUserList: {
        screen: ApplyUserList,
        navigationOptions: {
            header: null
        }
    },
    ApproveTeamApply: {
        screen: ApproveTeamApply,
        navigationOptions: {
            header: null
        }
    },
    TeamDetail: {
        screen: TeamDetail,
        navigationOptions: {
            header: null
        }
    },
    TaskPoint: {
        screen: TaskPoint,
        navigationOptions: {
            header: null
        }
    },
    SelectTeam: {
        screen: SelectTeam,
        navigationOptions: {
            header: null
        }
    },
    TaskDetail: {
        screen: TaskDetail,
        navigationOptions: {
            header: null
        }
    },
    TaskLogPage: {
        screen: TaskLogPage,
        navigationOptions: {
            header: null
        }
    },
    NewTaskLog: {
        screen: NewTaskLog,
        navigationOptions: {
            header: null
        }
    },
    TaskCompletePage: {
        screen: TaskCompletePage,
        navigationOptions: {
            header: null
        }

    },
    NewTaskComplete: {
        screen: NewTaskComplete,
        navigationOptions: {
            header: null
        }
    },
    PointExchangePage: {
        screen: PointExchangePage,
        navigationOptions: {
            header: null
        }
    },
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null
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