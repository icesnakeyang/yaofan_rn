import {API} from "../../../api/api";
import DataStore from "../../../expand/dao/DataStore";
import Types from "../../types";

export default function login(params, callback) {
    return dispatch => {
        let url = API.apiLogin
        let body = {}
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, '')
            .then((response) => {
                console.log(response)
                if (response.code === 0) {
                    dispatch({
                        type: Types.USER_LOGIN_SUCCESS,
                        userInfo: response.data.userInfo
                    })
                }
            })
    }
}