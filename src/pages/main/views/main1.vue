<template>
    <div>
        <div class="rs-position-re ios7mt0">
    	<img src="@/assets/banner-2.jpg" width="100%">
    	<div class="rs-tips-index">
    		<div class="rs-tips-index1">
	    		<div class="rs-tips-time"></div>
	    		<div class="rs-tips-week"></div>
	    	</div>
    	</div>
    </div>
      <div>
          通知
      </div>  
      <ul class="mui-table-view mui-grid-view mui-grid-9">
		            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
				    <router-link tag="a" to="/feedback"><span class="mui-icon mui-icon-home"></span>
		                    <div class="mui-media-body">反馈</div></router-link>
		                    </li>
		           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
		                    <span class="mui-icon mui-icon-more"></span>
		                    <div class="mui-media-body">more</div></a></li>
		        </ul>
    </div>
</template>
<script>
export default {
  name: "main1"
};
</script>

