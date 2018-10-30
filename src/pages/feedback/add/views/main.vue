<template>
    <div class="page-loadmore">
    <mt-header :title="TITLE">
    </mt-header>
    <ul class="mui-table-view">
        <li class="mui-table-view-cell">
            <a class="mui-navigate-right" @click="linkUrl('empsel')">
                发起人：{{this["EMPID.EMPNAME"]}}
            </a>
        </li>
        <li v-if="ISSHOWWD" class="mui-table-view-cell">
            <a class="mui-navigate-right">
                网点：
            </a>
        </li>
        <li class="mui-table-view-cell">
            <a class="mui-navigate-right">
                类别：{{REMARK}}
            </a>
        </li>
        <li class="mui-table-view-cell">
            <a class="mui-navigate-right">
                说明
            </a>
            <input v-model="REMARK"/>
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
      ...mapGetters("main",['EMPID','EMPID.EMPCODE','EMPID.EMPNAME',"REMARK"]),
      ...mapGetters("dts",[]),
      ISSHOWWD:function(){
          return this["EMPID"]!="";
      }
  },
  methods: {
    linkUrl: function(url) {
      this.$router.push("/feedback/add/"+url);
    },
    delEmp:function(index){
      this.$store.commit("feedback-add/delEmp",{index});
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

