import Vuex from 'vuex';
import Vue from 'vue';
import Vue2TouchEvents from 'vue2-touch-events';
import createPersistedState from 'vuex-persistedstate';
import User from './modules/user';
import Chat from './modules/chat';
import Message from './modules/message';


Vue.use(Vue2TouchEvents, {
    disableClick: true,
});
Vue.use(Vuex);
Vue.use(require('vue-moment'));

export default new Vuex.Store({
    modules: {
        user: User,
        chat: Chat,
        message: Message
    },
    plugins: [createPersistedState()],
})

