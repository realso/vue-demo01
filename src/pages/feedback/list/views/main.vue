<template>
    <div class="page-loadmore">
    <rs-header :title="TITLE">
         <router-link slot="right" tag="a" to="/feedback/add">新增</router-link>
    </rs-header>
    <div class="view">
        <div class="mui-input-row mui-search r-search bk-f2 line-33 ">
		<div style="margin-right: 52px;">
		<input type="search" class="mui-input-clear" v-model="searchInput" style="padding: 0 0 0 15px;" placeholder="输入">
		</div>
		<input type="button"  class="mui-pull-right border-none" @click="doQuery" value="查询">
	</div>
  <mt-navbar v-model="selected">
    <mt-tab-item id="1">待发送</mt-tab-item>
    <mt-tab-item id="2">待关闭</mt-tab-item>
    <mt-tab-item id="3">已发送</mt-tab-item>
    <mt-tab-item id="4">筛选</mt-tab-item>
  </mt-navbar>
    <div class="page-loadmore-wrapper">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  :top-status.sync="topStatus" ref="loadmore">
    <ul>
        <li class="item" v-for="item in list" :key="item.id" @click="moveTo(item.DEPTNAME)" v-hold="hold">
           {{item.DEPTCODE}}{{item["FULLDEPTNAME"]}}
        </li>
    </ul>
    </mt-loadmore>   
    </div>
    </div>
    </div>
</template>
<script>
import db from "@/api/db";
export default {
  name: "list",
  props: {
    TITLE: { type: String }
  },
  data() {
    return {
      list: [],
      topStatus: "",
      allLoaded: false,
      searchInput: "",
      selected: "1"
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
      db.open({
        modalName: "TBS_DEPT",
        where: "[DEPTNAME] LIKE '%" + this.searchInput + "%'",
        orderBy: "[RULECODE]",
        pageSize: 15,
        pageIndex: 1
      }).then(data => {
        this.list = data.data.items;
        this.topStatus = "";
        this.$refs.loadmore.onTopLoaded();
      });

      var para = {};
      var EMPID = g_s.getUserInfo("EMPID");
      para["EMPID"] = $store.state["user"].userInfo["EMPID"];
      para["STATE"] = this.d.getValue("QRYADV1", "STATE");
      para["INPUT"] = this.txtSearch.get("value");
      para.sqlId = "48171";
      para.pageSize = "10";
      db.open("QRY", para);
    },
    moveTo: function(id) {
      alert(id);
    },
    hold: function() {
      alert("长按");
    }
  }
};
</script>
<style scoped>
.view {
  margin-top: 60px;
}
.item {
  line-height: 32px;
  text-align: left;
}
</style>

