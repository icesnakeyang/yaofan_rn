import Tyeps from "../../action/types";

const defaultState = {
    task: null
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Tyeps.TASK_CREATE_FAIL:
            return {
                ...state,
                error: action.error
            }
        case Tyeps.TASK_LIST_SUCCESS:
            return {
                ...state,
                tasks: action.tasks
            }
        case Tyeps.TASK_LIST_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}