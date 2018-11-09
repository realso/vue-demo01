<template>
<div class="rs-flex" style="padding-top:88px">
  <rs-header title="报表查询"></rs-header>
  <div class="mui-content">
      <div v-for="item in list" :key="item.id">
        <div class="rs-title">{{item.title}}</div>
        <rs-list size="15">
        <rs-list-item v-for="item1 in item.list" :path="item1.path" isright=true :key="item1.id">
            {{item1.name}}
        </rs-list-item>
        </rs-list>
      </div>
  </div>  
</div>
</template>
<script>
import list from '../baobiao.json'

export default {
  name: "main2",
  data () {
	  return {
		  list: []
	  }
  },
  created() {
	 this.list = list
  }
}
</script>
<style scoped>
.view {
 margin-top:60px;
}
</style>

