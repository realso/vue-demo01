<template>
  <div style="height:100%">
    <keep-alive>
      <router-view ref="view" />
    </keep-alive>
    <rs-tabbar v-model="selected">
      <rs-tab-item id="main1" icon="mui-icon rs-font rs-gongzuotai">
        <span slot="label">工作台</span>
      </rs-tab-item>
      <rs-tab-item id="main2" icon="mui-icon rs-font rs-licai">
        <span slot="label">报表查询</span>
      </rs-tab-item>
      <rs-tab-item id="main3" icon="mui-icon rs-font rs-xiaoxi">
        <span slot="label">消息</span>
      </rs-tab-item>
      <rs-tab-item id="main4" icon="mui-icon rs-font rs-wode">
        <span slot="label">我的</span>
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