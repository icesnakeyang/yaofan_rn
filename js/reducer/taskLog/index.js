import Types from "../../action/types";

const defaultState = {
    taskLog: null
}
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.TASKLOG_CREATE_SUCCESS:
            return {
                ...state
            }
        case Types.TASKLOG_CREATE_FAIL:
            return {
                ...state,
                error: action.error
            }
        case Types.TASKLOG_LIST_SUCCESS:
            return {
                ...state,
                taskLogs: action.taskLogs
            }
        case Types.TASKLOG_LIST_FAIL:
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