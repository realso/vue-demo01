<template>
  <div>
    <transition>
      <keep-alive>
        <component v-if="$route.params.view==view.name" v-for="view in views" :is="view.type" :key="view.name" :ref="view.name" :ref-store="view.refStore" :TITLE="view.TITLE"></component>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import store from "./store";
import feedbackAddMain from "./views/main";
import empSel from "@/pages/com/views/emp_sel";
export default {
  data() {
    return {
      showView: "main",
      views: [
        { type: "feedback-add-main", name: "main", TITLE: "反馈" },
        {
          type: "emp-sel",
          name: "empsel",
          refStore: { mutation: "feedback-add/setEmp", path: "main" }
        },
        {
          type: "emp-sel",
          name: "dtsempsel",
          refStore: { mutation: "feedback-add/addEmp", path: "dts" }
        }
      ]
    };
  },
  components: {
    "feedback-add-main": feedbackAddMain,
    "emp-sel": empSel
  },
  activated: function() {
    this.$store.commit("feedback-add/setParams", this.$route.query);
    if ("ADD" == this.$route.query.ACTION) {
      this.$store.dispatch("feedback-add/add", this.$route.query);
    }
    if ("VIEW" == this.$route.query.ACTION) {
      this.$store.dispatch("feedback-add/open", this.$route.query);
    }
  }
};
</script>

