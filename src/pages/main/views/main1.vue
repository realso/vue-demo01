<template>
	<div class="rs-flex">
		<div class="rs-position-re ios7mt0">
			<img src="@/assets/img/banner-2.jpg" style="width:100%">
			<div class="rs-tips-index">
				<div class="rs-tips-index1"></div>
				<div class="rs-tips-time"></div>
				<div class="rs-tips-week"></div>
			</div>
	  </div>
		<rs-tip>
			<span slot="title"><span class="rs-font rs-wangdiandongtai mr5 c-active"></span>不忘初心</span>
			<div class="mui-text-center">不忘初心,牢记使命！</div>
		</rs-tip>
		<div class="mui-content">
			<rs-grid border=false type="white">
				<rs-grid-item v-for="item in navs" :path="item.path" :key="item.id">
					<span slot="icon" class="f24" :class="item.icon"></span>
					<span class="f12">{{item.name}}</span>
				</rs-grid-item>
				<rs-grid-item path="#">
					<span slot="icon" class="f24 mui-icon mui-icon-more"></span>
					<span class="f12">more</span>
				</rs-grid-item>
			</rs-grid>
		</div>				
	</div>
</template>
<script>
import navs from '../nav.json'

export default {
  name: "main1",
  data () {
	  return {
		  navs: []
	  }
  },
  created() {
	 this.navs = navs
  }
}
</script>

