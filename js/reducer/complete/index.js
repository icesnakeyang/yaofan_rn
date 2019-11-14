import Types from "../../action/types";

const defaultState = {
    complete: null
}
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.TASKCOMPLETE_CREATE_SUCCESS:
            return {
                ...state
            }
        case Types.TASKCOMPLETE_CREATE_FAIL:
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