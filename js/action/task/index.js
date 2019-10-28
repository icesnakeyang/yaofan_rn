import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";

export function createTask(params, callback) {
    console.log(1)
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
        console.log(2)
        console.log(url)
        console.log(body)
        console.log(token)
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