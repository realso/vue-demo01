<template>
  <div class="page-loadmore">
    <mt-header :title="TITLE">
      <mt-button slot="left" icon="back" @click="$router.goBack()">返回</mt-button>
    </mt-header>
    <div class="view">
      <div class="mui-input-row mui-search r-search bk-f2 line-33 ">
        <div style="margin-right: 52px;">
          <input type="search" class="mui-input-clear" v-model="searchInput" style="padding: 0 0 0 15px;" placeholder="输入">
        </div>
        <input type="button" baseclass="mui-pull-right border-none" @click="doQuery" value="查询">
      </div>
      <div class="page-loadmore-wrapper">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill=false :bottom-all-loaded="allLoaded" :top-status.sync="topStatus" ref="loadmore">
          <ul>
            <li class="item" v-for="item in list" :key="item.id" @click="selectEmp(item)" v-hold="hold">
              {{item.EMPCODE}}{{item["EMPNAME"]}}
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
      if(EMPIDX.length==0){
        EMPIDX.push(-1);
      }
      db.open({
        modalName: "TBS_EMP",
        where: "[EMPNAME] LIKE '%" + this.searchInput + "%' AND [EMPID] NOT IN("+EMPIDX+")",
        orderBy: "[EMPCODE]",
        pageSize: 15,
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
.view {
  margin-top: 60px;
}
.item {
  line-height: 32px;
  text-align: left;
}
</style>

