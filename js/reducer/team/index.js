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
        case Tyeps.TEAM_LIST_SUCCESS:
            return {
                ...state,
                teams: action.teams
            }
        case Tyeps.TEAM_LIST_FAIL:
            return {
                ...state,
                error: action.error
            }
        case Tyeps.TEAM_SEARCH_SUCCESS:
            return {
                ...state,
                teams: action.teams
            }
        case Tyeps.TEAM_SEARCH_FAIL:
            return {
                ...state,
                error: action.error
            }
        case Tyeps.TEAM_GET_SUCCESS:
            return {
                ...state,
                team: action.team
            }
        case Tyeps.TEAM_GET_FAIL:
            return {
                ...state,
                error: action.error
            }
        case Tyeps.TEAM_APPLY_TEAM_SUCCESS:
            return {
                ...state,
                applyTeam: action.applyTeam
            }
        case Tyeps.TEAM_APPLY_TEAM_FAIL:
            return {
                ...state,
                error: action.error
            }
        case Tyeps.TEAM_LIST_APPLY_TEAM_SUCCESS:
            return {
                ...state,
                applyTeamList: action.applyTeamList
            }
        case Tyeps.TEAM_LIST_APPLY_TEAM_FAIL:
            return {
                ...state,
                error: action.error
            }
        case Tyeps.TEAM_GET_APPLY_TEAM_SUCCESS:
            return {
                ...state,
                applyTeam:action.applyTeam
            }
        case Tyeps.TEAM_GET_APPLY_TEAM_FAIL:
            return {
                ...state,
                error:action.error
            }
        default:
            return state
    }
}