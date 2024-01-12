export function userReducer(state = null, action) {
    switch (action.type) {
    case "LOGGED_IN_USER":
    return action.payload;
    case "LOGOUT":
    return action.payload;
    case "USER NOT FOUND":
    return action.payload;
    case "CURRENT_USER":
    return action.payload;
    default:
    return state;
    }
}