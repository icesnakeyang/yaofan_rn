import DataStore from "../../expand/dao/DataStore";
import Types from '../types'

const LAN_KEY = 'language_locale'

export function loadLanguage(callback) {
    return dispatch => {
        let dataStore = new DataStore()
        dataStore.fetchLocalData(LAN_KEY)
            .then((response) => {
                dispatch({
                    type: Types.LANGUAGE_LOAD_SUCCESS,
                    locale: response.data
                })
            })

    }

}