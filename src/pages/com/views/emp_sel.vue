<template>
  <div class="mui-layout mui-layout-top">
    <rs-header title="我是标题" color="primary">
      <a slot="left" @click="$router.goBack()" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
    </rs-header>
    <div class="mui-input-row mui-search r-search">
      <rs-button link="true" @click="doQuery" class="mui-pull-right">查询</rs-button>
      <input type="search" class="mui-input-clear" v-model="searchInput" style="padding: 0 0 0 15px;" placeholder="输入">
    </div>
    <div class="mui-content">
      <div class="page-loadmore-wrapper">
        <rs-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill=false :bottom-all-loaded="allLoaded" :top-status.sync="topStatus" ref="loadmore">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell" v-for="item in list" :key="item.id" @click="selectEmp(item)" v-hold="hold">
              {{item.EMPCODE}}{{item["EMPNAME"]}}
            </li>
          </ul>
        </rs-loadmore>
      </div>
    </div>
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
<style scoped>
.r-search input.mui-input-clear{background: #fff;  text-align: left; padding: 0 65px 0 15px; border: 5px solid #f8f8f9; border-radius: 0; height: 35px; margin-bottom: 0;}
.r-search input.mui-pull-right{ background: #f8f8f9; color: #58cffa; position: absolute; top: 0; height: 37px; right: 0;}
input[type='submit']:enabled:active, input[type='submit'].mui-active:enabled,
.mui-btn-primary:enabled:active,
.mui-btn-primary.mui-active:enabled, .mui-btn-blue:enabled:active, .mui-btn-blue.mui-active:enabled
{
    border: none;
    background-color: #f8f8f9;
}
</style>

