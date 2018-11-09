<template>
  <div id="login" selected="true">
    <div class="rs-login">
      <div class="rs-login-logo">
        <img src="../../assets/logo.png" alt="" />
      </div>
      <form id='login-form' class="mui-input-group">
        <div class="mui-input-row">
          <input type="text" v-model="form_email" id="main.form_email" class="mui-input-clear mui-input" placeholder="请输入账号">
        </div>
        <div class="mui-input-row">
          <input id='password' type="password" v-model="form_password" class="mui-input-clear mui-input" placeholder="请输入密码">
        </div>
      </form>
      <div class="mui-content-padded">
        <rs-button size="large" @click="doLogin">登录</rs-button>
      </div>
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
  #login{
    background-image:url("../../assets/img/bk-login.jpg");background-size: 100% 100%;height: 100%;position: relative;
  }
  .rs-login{ width: 100%; position: absolute; top: 50%; margin-top: -190px}
  .rs-login-logo{width: 40%; padding: 15px; margin: 0 auto;}
  .rs-login-logo img{display: block;width: 100%}
  .mui-input-group{background: none; margin: 30px 0}
  .mui-input-group:before,.mui-input-group:after{display: none}
  .mui-input{ color: #fff; text-align: center}
</style>
