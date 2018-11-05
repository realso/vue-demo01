<template>
  <div id="login" selected="true" class=" mui-content" style="background: #fff;">
    <div class="login-logo">
      <img src="../../assets/logo.png" alt="" />
    </div>
    <div class="form-group rs-text-center mt15">
      <input type="text" class="input-line" v-model="form_email" id="main.form_email" placeholder="用户名/手机号码" />
    </div>
    <div class="form-group rs-text-center mt15">
      <input type="password" v-model="form_password" placeholder="密码" class="input-line" />

    </div>
    <div class="rs-font rs-baifang chidden "></div>
    <button @click="doLogin">登录</button>
    <div class="login-jz rs-text-right">
      <input type="checkbox" class="login-checkbox" checked="true" />记住密码
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form_email: "wh",
      form_password: "654321@s",
      form_recordPass: true
    };
  },
  computed: {},
  components: {},
  created() {},
  methods: {
    doLogin: function() {
      let _this = this;
      debugger;
      this.$store
        .dispatch("user/login", {
          form_email: this.form_email,
          form_password: this.form_password,
          guid: this.getGuidGenerator()
        })
        .then(res => {
          if (_this.$store.getters["user/isLogin"]) {
            _this.$router.push("/");
          }
        });
    },
    getGuidGenerator: function() {
      var S4 = function() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return (
        S4() +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        "-" +
        S4() +
        S4() +
        S4()
      );
    }
  }
};
</script>
<style>
</style>
