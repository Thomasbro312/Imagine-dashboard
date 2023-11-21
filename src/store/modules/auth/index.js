import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
export default {
    state: {
        user_id: null,
        user: null,
        token: null,
    },
    mutations,
    actions,
    getters,
}
