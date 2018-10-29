import {
  login
} from "@/api/user"

const state = {
  userInfo: {}
}
const mutations = {
  "INIT_DATA": function (state) {
    let userInfo = localStorage.getItem("_user_userInfo_");
    try {
      let ouserInfo = JSON.parse(userInfo);
      state.userInfo = ouserInfo||{};
    } catch (e) {
      localStorage.removeItem("_user_userInfo_");
    }
  },
  "SET_DATA": function (state, userInfo) {
    state.userInfo = userInfo || {};
    if (userInfo) {
      localStorage.setItem("_user_userInfo_", JSON.stringify(userInfo));
    } else {
      localStorage.removeItem("_user_userInfo_");
    }
  }
}
const getters = {
  isLogin(state) {
    return state.userInfo.status == 2;
  }
}
const actions = {
  login({
    commit
  }, userInfo) {
    return login(userInfo).then(function (res) {
      commit("SET_DATA", res.data);
      return res.data;
    }).then(function(data){
      debugger;
    });
  },
  loginOut({commit}) {
    commit("SET_DATA", null);
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
