const defaultState = {
    color: {
        THEME_HEAD_COLOR: '#2d3741',
        THEME_HEAD_TEXT: '#ddd',
        THEME_BACK_COLOR: '#d3d3d3',
        THEME_ROW_COLOR:'#eeeeee',
        THEME_ROW_TEXT: '#333',
        THEME_TAB_ICON_COLOR:'#00924d',
        THEME_BUTTON_COLOR:'#00924d',
        THEME_BUTTON_TEXT:'#eee'
    }
}

export default function onAction(state = defaultState, action) {
    switch (action.type) {
        default:
            return state
    }
}