const defaultState = {
    color: {
        THEME_HEAD_COLOR: '#2d3741',
        THEME_BACK_COLOR: '#f5f5f5',
        THEME_BACK_TEXT: '#fff'
    }
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        default:
            return state
    }
}