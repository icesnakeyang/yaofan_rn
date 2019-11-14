import {loadLanguage} from "./language";
import {autoLogin, login, updateUsername} from "./user/login";
import {
    agreeApplyTeam,
    applyTeam, clearTeam,
    createTeam,
    getApplyTeam,
    getTeamByTeamId,
    listApplyTeam,
    listTeam,
    rejectApplyTeam,
    searchTeam
} from "./team";
import {createTask, getTaskByTaskId, grabTask, listBiddingTasks, listMyTasks} from "./task";
import {createTaskLog, listTaskLog} from "./taskLog";
import {createComplete, listTaskComplete} from "./complete";

export default {
    loadLanguage,
    login,
    autoLogin,
    updateUsername,
    createTeam,
    listTeam,
    searchTeam,
    getTeamByTeamId,
    applyTeam,
    listApplyTeam,
    getApplyTeam,
    rejectApplyTeam,
    agreeApplyTeam,
    clearTeam,
    createTask,
    listBiddingTasks,
    getTaskByTaskId,
    listMyTasks,
    grabTask,
    createTaskLog,
    listTaskLog,
    createComplete,
    listTaskComplete
}