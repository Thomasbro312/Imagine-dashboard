import {createStore} from 'vuex';

import AuthModule from '@/store/modules/auth/index.js'
import CampaignModule from "@/store/modules/campaign";
import UserModule from '@/store/modules/user'

const store = createStore({
  modules: {
    auth: AuthModule,
    campaign: CampaignModule,
    user: UserModule
  },

});

export default store;