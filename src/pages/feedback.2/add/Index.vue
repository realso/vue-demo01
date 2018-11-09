<template>
  <div style="height:100%">
    <transition :name="transitionName">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
          <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
      </keep-alive>
    </transition>
    <transition :name="transitionName">
      <router-view v-if="!$route.meta.keepAlive">
        <!-- 这里是不会被缓存的视图组件！ -->
      </router-view>
    </transition>
  </div>
</template>
<script>
import store from "./store";
export default {
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  activated: function() {
    console.log(this.$route.path, "color:red");
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
<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>


