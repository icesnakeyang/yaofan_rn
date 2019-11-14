import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";

export function createComplete(params, callback) {
    return dispatch => {
        let url = API.apiCreateComplete
        let body = {
            taskId: params.taskId,
            content: params.content
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TASKCOMPLETE_CREATE_SUCCESS
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
                    type: Types.TASKCOMPLETE_CREATE_FAIL,
                    error: error.message
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}

export function listTaskComplete(params, callback) {
    return dispatch => {
        let url = API.apiListTaskComplete
        let body = {
            taskId: params.taskId
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TASKCOMPLETE_LIST_SUCCESS,
                        taskCompletes: response.data.taskCompletes
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
                    type: Types.TASKCOMPLETE_LIST_FAIL,
                    error: error.message
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}