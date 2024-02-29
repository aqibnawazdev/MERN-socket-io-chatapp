export const userReducer = (state, action) => {
    if (action.type === "SELECT_USER") {
        return { ...state, selectedUser: action.payload };
    } else if (action.type === "CHAT") {
        return { ...state, chat: action.payload }
    } else {
        return state
    }
};