import {loadLanguage} from "./language";
import {autoLogin, login, updateUsername} from "./user/login";
import {createTeam, getTeamByTeamId, listTeam, searchTeam} from "./team";

export default {
    loadLanguage,
    login,
    autoLogin,
    updateUsername,
    createTeam,
    listTeam,
    searchTeam,
    getTeamByTeamId
}