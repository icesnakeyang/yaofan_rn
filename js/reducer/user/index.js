import Tyeps from "../../action/types";

const defaultState = {
    userInfo: null
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Tyeps.USER_LOGIN_SUCCESS:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case Tyeps.USER_LOGIN_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}