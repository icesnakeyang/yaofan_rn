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
                    console.log(response)
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