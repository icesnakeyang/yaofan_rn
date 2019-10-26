import {loadLanguage} from "./language";
import {autoLogin, login, updateUsername} from "./user/login";
import {applyTeam, createTeam, getApplyTeam, getTeamByTeamId, listApplyTeam, listTeam, searchTeam} from "./team";

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
    getApplyTeam
}