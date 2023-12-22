export default {
  setAuthentication(state, isCorrect) {
    state.isCorrect = isCorrect;
  },
  setError(state, error) {
    state.error = error;
  },
  didAutoLogout(state){
    state.didAutoLogout = true
  },
  setUser(state, user) {
    state.user = user;
  },
  setUserName(state, userName) {
    state.userName = userName;
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