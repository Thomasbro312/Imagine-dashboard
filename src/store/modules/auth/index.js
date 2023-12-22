import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
export default {
    state: {
        user_id: null,
        user: null,
        userName: null,
        token: null,
        isCorrect: false,
        error: null
    },
    mutations,
    actions,
    getters,
}
