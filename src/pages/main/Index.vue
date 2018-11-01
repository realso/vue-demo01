<template>
  <div class="page">
    {{title2}}{{title}}
    <keep-alive>
      <router-view ref="view"/>
    </keep-alive>
    <mt-tabbar v-model="selected">
    <mt-tab-item id="main1">
      <img slot="icon" >
      工作台
    </mt-tab-item>
    <mt-tab-item id="main2">
      <img slot="icon" >
      报表
    </mt-tab-item>
    <mt-tab-item id="main3">
      <img slot="icon" >
      我的
    </mt-tab-item>
</mt-tabbar>
  </div>
</template>
<script>
import {mapGetters} from "./store"
//import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      selected: "main1"
    };
  },
  computed: {
    ...mapGetters("main",['title','title2'])
    ,
    ...mapGetters("main",['title','title2'])
  },
  methods:{
  },
  watch: {
    selected(curVal, oldVal) {
      if (curVal !== oldVal) {
        this.$router.push(curVal);
      }
    }
  }
};
</script>