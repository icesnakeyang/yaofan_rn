import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";

export function createTask(params, callback) {
    return dispatch => {
        let url = API.apiCreateTask
        let body = {
            detail: params.detail,
            title: params.title,
            endTime: params.endTime,
            point: params.point
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TASK_CREATE_SUCCESS
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
                    type: Types.TASK_CREATE_FAIL,
                    error: error.message
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}

export function listTasks(params, callback) {
    console.log(1)
    return dispatch => {
        let url = API.apiListTasks
        let body = {}
        let token = params.token
        let dataStore = new DataStore()
        console.log(url)
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.TASK_LIST_SUCCESS,
                        tasks: response.data.tasks
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
                    type: Types.TASK_LIST_FAIL,
                    error: error.message
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}