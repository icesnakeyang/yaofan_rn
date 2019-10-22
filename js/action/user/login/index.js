import {API} from "../../../api/api";
import DataStore from "../../../expand/dao/DataStore";
import Types from "../../types";

const TOKEN_NAME = 'yaofan_token'

export function autoLogin(callback) {
    return dispatch => {
        getLocalStorageToken()
            .then((token) => {
                if (token) {
                    //获取到token
                    loginUserByToken(token)
                        .then((response) => {
                            if (response.code === 0) {
                                dispatch({
                                    type: Types.USER_LOGIN_SUCCESS,
                                    userInfo: response.data.userInfo
                                })
                                saveLocalStorageToken(response.data.userInfo.token)
                                setTimeout(() => {
                                    callback(true)
                                }, 100)
                            } else {
                                throw new Error(response.code)
                            }
                        })
                        .catch((error) => {
                            throw new Error(error)
                        })
                } else {
                    throw new Error("no token")
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.USER_LOGIN_FAIL,
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }

}

export function login(params, callback) {
    return dispatch => {
        let url = API.apiLogin
        let body = {
            phone: params.phone,
            password: params.password
        }
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, '')
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.USER_LOGIN_SUCCESS,
                        userInfo: response.data.userInfo
                    })
                    saveLocalStorageToken(response.data.userInfo.token)
                    setTimeout(() => {
                        callback(true)
                    }, 100)
                } else {
                    dispatch({
                        type: Types.USER_LOGIN_FAIL,
                        error: response.code
                    })
                    setTimeout(() => {
                        callback(false)
                    }, 100)
                }
            })
            .catch((error) => {
                dispatch({
                    type: Types.USER_LOGIN_FAIL,
                    error: error
                })
                setTimeout(() => {
                    callback(false)
                }, 100)
            })
    }
}

export function updateUsername(params, callback) {
    return dispatch => {
        let url = API.apiUpdateUsername
        let body = {
            username: params.username
        }
        let token = params.token
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    dispatch({
                        type: Types.USER_UPDATE_NAME_SUCCESS,
                        userInfo: response.data.userInfo
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
                    type: Types.USER_UPDATE_NAME_FAIL,
                    error: error
                })
            })
    }
}

function loginUserByToken(token) {
    return new Promise((resolve, reject) => {
        const url = API.apiLoginByToken
        let body = {}
        let dataStore = new DataStore()
        dataStore.fetchPostData(url, body, token)
            .then((response) => {
                if (response.code === 0) {
                    resolve(response)
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function getLocalStorageToken() {
    return new Promise((resolve, reject) => {
        let dataStore = new DataStore()
        dataStore.fetchLocalData(TOKEN_NAME)
            .then((response) => {
                if (response && response.data) {
                    resolve(response.data)
                } else {
                    throw new Error('no token')
                }
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function saveLocalStorageToken(token) {
    let dataStore = new DataStore()
    dataStore.saveData(TOKEN_NAME, token)
}