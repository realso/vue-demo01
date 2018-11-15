<template>
  <div class="hello" style="padding-top:44px">
    <rs-header title="我是标题" color="primary">
      <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
    </rs-header>
    <rs-search :value.sync="searchInput" @click.native="doQuery">
      <rs-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill=false :bottom-all-loaded="allLoaded" :top-status.sync="topStatus" ref="loadmore">
        <rs-list size="12">
          <rs-list-item v-for="(item,index) in list" isright=true :key="index" @click.native="selectEmp(item)" v-hold="hold">
            {{item.EMPCODE}}{{item["EMPNAME"]}}
          </rs-list-item>
        </rs-list>
      </rs-loadmore>  
    </rs-search>
  </div>
</template>
<script>
import db from "@/api/db";
export default {
  name: "emp_sel",
  props: {
    refStore: { type: Object },
    singleOpen: { type: Boolean },
    TITLE: { type: String }
  },
  data() {
    return {
      list: [],
      topStatus: "",
      allLoaded: false,
      searchInput: "",
      query: {}
    };
  },
  methods: {
    loadTop: function() {
      this.doQuery();
    },
    loadBottom: function() {
      this.$refs.loadmore.onBottomLoaded();
    },
    doQuery: function() {
      this.topStatus = "loading";
      let EMPIDX = this.$route.query.EMPIDX;
      if (EMPIDX.length == 0) {
        EMPIDX.push(-1);
      }
      db.open({
        modalName: "TBS_EMP",
        where:
          "[EMPNAME] LIKE '%" +
          this.searchInput +
          "%' AND [EMPID] NOT IN(" +
          EMPIDX +
          ")",
        orderBy: "[EMPCODE]",
        pageSize: 25,
        pageIndex: 1
      }).then(data => {
        this.list = data.data.items;
        this.topStatus = "";
        this.$refs.loadmore.onTopLoaded();
      });
    },
    selectEmp: function(item) {
      let para = {};
      para["path"] = this.refStore.path;
      para["item"] = item;
      this.$store.commit(this.refStore.mutation, para);
      this.$router.goBack();
    },
    hold: function() {
      alert("长按");
    }
  },
  activated: function() {
    console.log("%c" + this.$route.path, "color:red");
    this.doQuery();
  }
};
</script>
<style scoped></style>

