<template>
    <div>
        <transition name="slide-right">
            <keep-alive>
                <router-view >
                    <!-- 这里是会被缓存的视图组件，比如 Home！ -->
                </router-view>
            </keep-alive>
        </transition>
    </div>
</template>
<script>
export default {
    name:"common-index"
}
</script>

<style>
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s;
  position: absolute;
  width: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}
</style>

