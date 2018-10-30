<template>
    <div class="page-loadmore">
    <rs-header title="反馈">
    </rs-header>
    <div class="view">
         <router-link tag="a" to="/feedback/add/emp_sel">{{EMPNAME}}选择员工</router-link>
    </div>
    </div>
</template>
<script>
import db from "@/api/db";
export default {
  name: "add",
  data() {
    return {
      EMPNAME: ""
    };
  },
  methods: {
    onSelectEmp(item) {
      debugger;
      this.EMPNAME = item.EMPNAME;
    },
    onShow: function() {
      debugger;
      alert("显示");
    }
  },
  mounted: function() {
    window.addEventListener("pageshow", this.onShow);
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

