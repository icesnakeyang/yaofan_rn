import Tyeps from "../../action/types";

const defaultState = {
    task: null
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Tyeps.TASK_CREATE_FAIL:
            return {
                ...state,
                team: action.error
            }
        default:
            return state
    }
}