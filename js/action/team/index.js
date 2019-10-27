import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";

export function createTeam(params, callback) {
    return dispatch => {
        let url = API.apiCreateTeam
        let body = {
            name: params.name,
            description: params.description
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TEAM_CREATE_SUCCESS,
                        team: response.data.team
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 100)
                } else {
                    throw new Error(response.code)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TEAM_CREATE_FAIL,
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}

export function listTeam(params, callback) {
    return dispatch => {
        let url = API.apiListTeam
        let body = {}
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TEAM_LIST_SUCCESS,
                        teams: response.data.teams
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 100)
                } else {
                    throw new Error(response.code)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TEAM_LIST_FAIL,
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }

}

export function searchTeam(params, callback) {
    return dispatch => {
        let url = API.apiSearchTeam
        let body = {
            name: params.name
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TEAM_SEARCH_SUCCESS,
                        teams: response.data.teams
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 100)
                } else {
                    throw new Error(response.code)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TEAM_SEARCH_FAIL,
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}

export function getTeamByTeamId(params, callback) {
    return dispatch => {
        let url = API.apiGetTeamByTeamId
        let body = {
            teamId: params.teamId
        }
        let token = params.token
        let dataStore = new DataStore
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TEAM_GET_SUCCESS,
                        team: response.data.team
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 100)
                } else {
                    throw new Error(response.code)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TEAM_GET_FAIL,
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}

export function applyTeam(params, callback) {
    return dispatch => {
        let url = API.apiApplyTeam
        let body = {
            teamId: params.teamId,
            remark: params.remark
        }
        let token = params.token
        let dataStore = new DataStore();
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TEAM_APPLY_TEAM_SUCCESS
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 100)
                } else {
                    throw new Error(response.code)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TEAM_APPLY_TEAM_FAIL,
                    error: error.message
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }

}

export function listApplyTeam(params, callback) {
    return dispatch => {
        let url = API.apiListApplyTeam
        let body = {}
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TEAM_LIST_APPLY_TEAM_SUCCESS,
                        applyTeamList: response.data.applyTeams
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 100)
                } else {
                    throw new Error(response.code)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TEAM_LIST_APPLY_TEAM_FAIL,
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}

export function getApplyTeam(params, callback) {
    return dispatch => {
        let url = API.apiGetApplyTeam
        let body = {
            applyId: params.applyId
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TEAM_GET_APPLY_TEAM_SUCCESS,
                        applyTeam: response.data.applyTeamView
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 100)
                } else {
                    throw new Error(response.code)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TEAM_GET_APPLY_TEAM_FAIL,
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }

}

export function rejectApplyTeam(params, callback) {
    return dispatch => {
        let url = API.apiRejectApplyTeam
        let body = {
            remark: params.remark,
            applyId: params.applyId
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TEAM_PROCESS_APPLY_TEAM_SUCCESS
                    })
                    setTimeout(() => {
                        callback(true)
                    }, 100)
                } else {
                    throw new Error(response.code)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.TEAM_PROCESS_APPLY_TEAM_FAIL,
                    error: error.message
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }

}