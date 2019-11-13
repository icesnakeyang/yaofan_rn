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
        case Tyeps.TASK_GET_SUCCESS:
            return {
                ...state,
                data: action.data
            }
        case Tyeps.TASK_GET_FAIL:
            return {
                ...state,
                error: action.error
            }
        case Tyeps.TASK_LIST_MY_TASKS_SUCCESS:
            return {
                ...state,
                tasks: action.tasks
            }
        case Tyeps.TASK_LIST_MY_TASKS_FAIL:
            return {
                ...state,
                error: action.error
            }
        case Tyeps.TASK_GRAB_SUCCESS:
            return {
                ...state
            }
        case Tyeps.TASK_GRAB_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}