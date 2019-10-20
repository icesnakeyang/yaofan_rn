const defaultState = {
    color: {
        THEME_HEAD_COLOR: '#2d3741',
        THEME_HEAD_TEXT: '#ddd',
        THEME_BACK_COLOR: '#d3d3d3',
        THEME_ROW_COLOR:'#2d3741',
        THEME_ROW_TEXT: '#ddd',
        THEME_TAB_ICON_COLOR:'#00924d'
    }
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        default:
            return state
    }
}