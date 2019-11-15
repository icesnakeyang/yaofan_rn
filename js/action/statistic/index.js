import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";

export function loadDashboard(params, callback) {
    return dispatch => {
        let url = API.apiLoadDashboard
        let body = {}
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                console.log(response)
                if (response.code === 0) {
                    console.log('ok')
                    dispatch({
                        type: Types.STATISTIC_DASHBOARD_SUCCESS,
                        data: response.data
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
                    type: Types.STATISTIC_DASHBOARD_FAIL,
                    error: error.message
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}