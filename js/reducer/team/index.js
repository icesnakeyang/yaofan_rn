import Tyeps from "../../action/types";

const defaultState = {
    team: null
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Tyeps.TEAM_CREATE_SUCCESS:
            return {
                ...state,
                team: action.team,
                error: null
            }
        case Tyeps.TEAM_CREATE_FAIL:
            return {
                ...state,
                error: action.error,
                team: null
            }
        default:
            return state
    }
}