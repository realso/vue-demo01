<template>
  <div>
     <component v-show="showView==view.name"  
     v-for="view in views" 
     :is="view.type" 
     :key="view.name" 
     :ref="view.name"
     :ref-store="view.refStore" 
     :TITLE="view.TITLE"
     ></component>
  </div>
</template>
<script>
import feedbackListMain from "./views/main";
export default {
  data() {
    return {
      showView:"main",
      views: [
        { type: "feedback-list-main", name: "main",TITLE:'反馈列表'}
      ]
    };
  },
  components: {
    "feedback-list-main": feedbackListMain,
  },
  beforeRouteEnter(to, from, next) {
    next(vm=>{
        vm.showView = to.params["view"]||'main';
    });
  },
  beforeRouteUpdate(to, from, next) {
    this.showView =  to.params["view"]||'main';
    next();
  },
  beforeRouteLeave(to, from, next) {
    next();
  }
};
</script>

