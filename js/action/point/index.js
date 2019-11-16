import {API} from "../../api/api";
import DataStore from "../../expand/dao/DataStore";
import Types from "../types";

export function applyPointWithdraw(params, callback) {
    return dispatch => {
        let url = API.apiApplyPointWithdraw
        let body = {
            point: params.point,
            remark: params.remark
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.POINT_WITHDRAW_APPLY_SUCCESS
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
                    type: Types.POINT_WITHDRAW_APPLY_FAIL,
                    error: error.message
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}