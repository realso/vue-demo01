import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app';
import user from './modules/user';
import permission from './modules/permission';
import schema from './modules/schema';

Vue.use(Vuex);
const store = new Vuex.Store({
  modules: {
    user,
    app,
    schema,
    permission
  }
});

store.commit("app/INIT_DATA");
store.commit("user/INIT_DATA");
store.commit("permission/INIT_DATA");
store.commit("schema/INIT_DATA");

export default store;
