import Types from "../../action/types";

const defaultState = {
    data: null
}
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.STATISTIC_DASHBOARD_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case Types.STATISTIC_DASHBOARD_FAIL:
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