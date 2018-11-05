<template>
  <div class="page-loadmore">
    <rs-header :title="TITLE">
      <router-link slot="right" tag="a" to="/feedback/add/main?ACTION=ADD">新增</router-link>
    </rs-header>
    <div class="view">
      <div class="mui-input-row mui-search r-search bk-f2 line-33 ">
        <div style="margin-right: 52px;">
          <input type="search" class="mui-input-clear" v-model="searchInput" style="padding: 0 0 0 15px;" placeholder="输入">
        </div>
        <input type="button" class="mui-pull-right border-none" @click="doQuery" value="查询">
      </div>
      <mt-navbar v-model="selected">
        <mt-tab-item :id="STATE.待发送">待发送</mt-tab-item>
        <mt-tab-item :id="STATE.待关闭">待关闭</mt-tab-item>
        <mt-tab-item :id="STATE.已关闭">已关闭</mt-tab-item>
        <mt-tab-item :id="4">筛选</mt-tab-item>
      </mt-navbar>
      <div class="page-loadmore-wrapper">
        <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :auto-fill=false :bottom-all-loaded="allLoaded" :top-status.sync="topStatus" ref="loadmore">
          <ul>
            <li class="item mui-table-view-cell mui-media f14 line-24 c-999" v-for="item in list" :key="item.id" @click="moveTo(item.BILLID)" v-hold="hold">
              <div class="rs-card-listhead">
                <span></span>
                {{item.SNODENAME}}
                <span class="mui-pull-right <%if(gv('STATE')!=9952){%>c-red<%}%>">
                   {{item.STATENAME}}
                  </span>
              </div>
              <div v-if="item.SENDDATE!=''" class="rs-position-re">
                <span class="rs-justify w4em">发 送 时 间</span>
                <span class="mui-pull-left"> : </span>
                <label class="ml10 c-333">
                  {{item.SENDDATE}}</label>
              </div>
              <div class="rs-position-re">
                <span class="rs-justify w4em">反 馈 类 别</span>
                <span class="mui-pull-left"> : </span>
                <label class="ml10 c-333">
                  {{item.FDBKTYPENAME}}
                  </label>
              </div>
              <div class="rs-position-re">
                <span class="rs-justify w4em">反 馈 说 明</span>
                <span class="mui-pull-left"> : </span>
                <label class="rs-ellipsis mui-block c-333 rs-padding-lf">
                  {{item.CONTENT}}
                  </label>
              </div>
              <div class="rs-position-re">
                <span class="rs-justify w4em">发 送 对 象</span>
                <span class="mui-pull-left"> : </span>
                <label class="ml10 c-333">
                  {{item.EMPNAME}}
                </label>
              </div>
              <div class="rs-card-listfoot">
                <a href="#" class="w100 c-999 mui-navigate-right">
                  <span class="mr20">
                    {{item.BILLCODE.split(' ')[0]}}
                    </span>
                   {{item.BILLCODE}}
                  <span class="mui-pull-right c-active mr15">查看</span>
                </a>
              </div>
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
      selected: "",
      STATE: {
        待发送: "103660",
        待解决: "103678",
        待关闭: "9951",
        已关闭: "9952"
      }
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
      let para = {};
      let EMPID = this.$store.state["user"].userInfo["EMPID"];
      para["EMPID"] = EMPID;
      para["STATE"] = this.selected;
      para["INPUT"] = this.searchInput;
      para.sqlId = "48171";
      para.pageSize = "10";
      db.open(para).then(ret => {
        this.list = ret.data.items;
        this.topStatus = "";
        this.$refs.loadmore.onTopLoaded();
      });
    },
    moveTo: function(id) {
      this.$router.push({path:"/feedback/add/main",query:{ACTION:"VIEW",BILLID:id}});
    },
    hold: function() {
      alert("长按");
    }
  },
  watch:{
    selected(newValue,oldValue){
      this.doQuery();
    }
  },
  activated:function(){
    if(!this.selected){
       this.selected = this.STATE.待发送;
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

