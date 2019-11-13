import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";

export function createTaskLog(params, callback) {
    return dispatch => {
        let url = API.apiCreateTaskLog
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
                        type: Types.TASKLOG_CREATE_SUCCESS
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
                    type: Types.TASKLOG_CREATE_FAIL,
                    error: error.message
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}

export function listTaskLog(params, callback) {
    return dispatch => {
        let url = API.apiListTaskLog
        console.log(params)
        let body = {
            taskId: params.taskId
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    console.log(response)
                    dispatch({
                        type: Types.TASKLOG_LIST_SUCCESS,
                        taskLogs: response.data.taskLogs
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
                    type: Types.TASKLOG_LIST_FAIL,
                    error: error.message
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}