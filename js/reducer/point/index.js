import Types from "../../action/types";

const defaultState = {
    point: null
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.POINT_WITHDRAW_APPLY_SUCCESS:
            return {
                ...state
            }
        case Types.POINT_WITHDRAW_APPLY_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return {
                ...state
            }
    }
}