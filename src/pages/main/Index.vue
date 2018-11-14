<template>
  <div class="mui-layout mui-layout-bottomtop">
    <keep-alive>
      <router-view ref="view" />
    </keep-alive>
    <rs-tabbar v-model="selected">
      <rs-tab-item id="main1">
        <span slot="icon" class="mui-icon rs-font rs-gongzuotai"></span>
        工作台
      </rs-tab-item>
      <rs-tab-item id="main2">
        <span slot="icon" class="mui-icon rs-font rs-licai"></span>
        报表查询
      </rs-tab-item>
      <rs-tab-item id="main3">
        <span slot="icon" class="mui-icon rs-font rs-xiaoxi"></span>
        消息
      </rs-tab-item>
      <rs-tab-item id="main4">
        <span slot="icon" class="mui-icon rs-font rs-wode"></span>
        我的
      </rs-tab-item>
    </rs-tabbar>
  </div>
</template>
<script>
import { mapGetters } from "./store";
//import {mapGetters} from 'vuex'
export default {
  data() {
    return {
      selected: "main1"
    };
  },
  computed: {
    ...mapGetters("main", ["title", "title2"]),
    ...mapGetters("main", ["title", "title2"])
  },
  methods: {},
  watch: {
    selected(curVal, oldVal) {
      if (curVal !== oldVal) {
        this.$router.push(curVal);
      }
    }
  }
};
</script>