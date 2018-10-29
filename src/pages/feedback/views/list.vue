<template>
    <div class="page-loadmore">
    <rs-header title="反馈">
    </rs-header>
    <div class="view">
        <div class="mui-input-row mui-search r-search bk-f2 line-33 ">
		<div style="margin-right: 52px;">
		<input type="search" class="mui-input-clear" style="padding: 0 0 0 15px;" intermediateChanges="true">
		</div>
		<input type="button"  baseclass="mui-pull-right border-none" value="查询">
	</div>
    <div class=" page-loadmore-wrapper">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded"  :top-status.sync="topStatus" ref="loadmore">
    <ul>
        <li v-for="item in list" :key="item.id">{{ item }}</li>
    </ul>
    <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">下拉刷新</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
    </div>
    </mt-loadmore>   
    </div>
    </div>
    </div>
</template>
<script>
export default {
    name:"list",
    data(){
        return{list:["a","b","c","d"],topStatus:"",allLoaded:false}
    },
    methods:{
        loadTop:function(){
            this.list = ["1","2","3"];
            this.$refs.loadmore.onTopLoaded();
        },
        loadBottom:function(){
            this.$refs.loadmore.onBottomLoaded();
        }
    }
}
</script>
<style scoped>
.view {
 margin-top:60px;
}
</style>

