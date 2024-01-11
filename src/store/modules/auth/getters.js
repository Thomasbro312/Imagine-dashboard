export default {
    getError(state){
        return  state.error
    },
    user_id(state){
        return state.user_id;
    },
    role(state){
        return state.role;
    },
    token(state){
        return state.token;
    },
    isAuthenticated(state){
        return !!state.token;
    },
    didAutoLogout(state) {
        return state.didAutoLogout;
    }
}