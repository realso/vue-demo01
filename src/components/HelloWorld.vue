<template>
  <div class="hello">
     <rs-header title="我是标题">
      <a slot="left" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
     <rs-button class="mui-btn mui-btn-blue" slot="right">测试</rs-button>
   </rs-header>
  <rs-tabbar :fixed =true >
    <rs-tab-item :value="['传入数组', '也是可以的']">
      <span slot="label">订单</span>
   </rs-tab-item>
  </rs-tabbar>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
