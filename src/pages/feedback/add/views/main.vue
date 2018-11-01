<template>
    <div class="page-loadmore">
    <mt-header :title="TITLE">
        <a slot="right" @click="save">保存</a>
    </mt-header>
    <ul class="mui-table-view">
        <li class="mui-table-view-cell">
            <a v-if="BILLCODE!=''" class="mui-navigate-right" @click="linkUrl('empsel')">
                {{BILLCODE}}
            </a>
        </li>
        <li class="mui-table-view-cell">
            <a class="mui-navigate-right" @click="linkUrl('empsel')">
                发起人：{{this["MKEMPID.EMPNAME"]}}
            </a>
        </li>
        <li class="mui-table-view-cell">
            <a class="mui-navigate-right">
                网点：{{this["SNODEID.SNODENAME"]}}
            </a>
        </li>
        <li class="mui-table-view-cell">
            <a class="mui-navigate-right">
                类别：{{CONTENT}}
            </a>
        </li>
        <li class="mui-table-view-cell">
            <a class="mui-navigate-right">
                说明
            </a>
            <input v-model.lazy="CONTENT"/>
        </li>
    </ul>
    <ul>
        <a @click="linkUrl('dtsempsel')">添加</a>
        <li v-for="(item,index) in dts" :key="item.ENTRYID">
            {{item["EMPID.EMPNAME"]}}
            <button @click="delEmp(index)"></button>
        </li>
    </ul>
    </div>
</template>
<script>
import {mapGetters} from "../store"
import store from '../../../../store';
export default {
  props:{
     TITLE:""
  },
  name: "feedback-add-main",
  data() {
    return {
    };
  },
  computed: {
      ...mapGetters("main",['BILLCODE','MKEMPID.EMPNAME',"SNODEID.SNODENAME","CONTENT"]),
      ...mapGetters("dts",[]),
      ISSHOWWD:function(){
          return this["EMPID"]!="";
      }
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push({path:"/feedback/add/"+url,query:{EMPIDX:this.dts.map(function(v){return v["EMPID"]})}});
    },
    delEmp:function(index){
      this.$store.commit("feedback-add/delEmp",{index});
    },
    save:function(){
       this.$store.dispatch("feedback-add/save");
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

