export default {
  setError(state, payload) {
    state.error = payload.error;
  },
  clearError(state) {
    state.error = null;
  },
  didAutoLogout(state){
    state.didAutoLogout = true
  },
  setUser(state, user) {
    state.user = user;
  },
  SetUser_id(state, user_id){
    state.user_id = user_id;
  },
  setToken(state, token) {
    state.token = token;
  },
  setRole(state, role) {
    state.role = role;
  },
  destroyToken(state) {
    state.token = null;
    localStorage.setItem('accessToken', "null");
  },
}