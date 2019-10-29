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
import {createTask, listTasks} from "./task";

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
    listTasks
}