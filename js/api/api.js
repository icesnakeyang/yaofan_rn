// const host = 'http://192.168.0.105:8089'
const host = 'http://192.168.1.247:8089'
// const host = 'http://192.168.1.214:8089'
// const host = 'http://192.168.43.29:8089'
// const host = 'http://192.168.0.106:8089'

export const API = {
    apiLogin: `${host}/user/login`,
    apiLoginByToken: `${host}/user/loginByToken`,
    apiUpdateUsername: `${host}/user/updateUsername`,
    apiCreateTeam: `${host}/team/createTeam`,
    apiListTeam: `${host}/team/listTeam`,
    apiSearchTeam: `${host}/team/searchTeam`,
    apiGetTeamByTeamId: `${host}/team/getTeamByTeamId`,
    apiApplyTeam: `${host}/team/applyTeam`,
    apiListApplyTeam: `${host}/team/listApplyTeam`,
    apiGetApplyTeam: `${host}/team/getApplyTeam`,
    apiRejectApplyTeam: `${host}/team/rejectApplyTeam`,
    apiAgreeApplyTeam: `${host}/team/agreeApplyTeam`,
    apiCreateTask: `${host}/task/createTask`,
    apiListBiddingTasks: `${host}/task/listBiddingTasks`,
    apiGetTaskByTaskId: `${host}/task/getTaskByTaskId`,
    apiListMyTasks: `${host}/task/listMyTasks`
}