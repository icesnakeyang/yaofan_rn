// const host = 'http://192.168.0.105:8089'
// const host = 'http://192.168.1.247:8089'
// const host = 'http://192.168.1.214:8089'
// const host = 'http://192.168.3.6:8089'
const host = 'http://192.168.0.106:8089'

export const API = {
    apiLogin: `${host}/user/login`,
    apiLoginByToken: `${host}/user/loginByToken`,
    apiUpdateUsername: `${host}/user/updateUsername`,
    apiCreateTeam: `${host}/team/createTeam`,
    apiListTeam: `${host}/team/listTeam`,
    apiSearchTeam: `${host}/team/searchTeam`,
    apiGetTeamByTeamId: `${host}/team/getTeamByTeamId`,
    apiApplyTeam: `${host}/team/applyTeam`,
    apiListApplyTeam: `${host}/team/listApplyTeam`
}