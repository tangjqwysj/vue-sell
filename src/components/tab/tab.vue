<template>
  <div class="tab">
    <cube-tab-bar v-model="selectedLabel" show-slider ref="tabBar">
      <cube-tab v-for="(tab,index) in tabs" :key="index" :label=tab.label class="border-bottom-1px">
      </cube-tab>
    </cube-tab-bar>
    <div class="slide-wrapper">
      <cube-slide :autoPlay='false' :showDots='false' :loop='false' @change="onChange"
                  @scroll='onScroll' ref="slide" :initialIndex='index' :options='slideOptions'>
        <cube-slide-item v-for="(item,index) in tabs" :key="index">
          <component ref="component" :is="item.component" :data='item.data'></component>
        </cube-slide-item>
      </cube-slide>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tab',
  props: {
    tabs: {
      type: Array,
      default: () => []
    },
    initialIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      index: this.initialIndex,
      slideOptions: {
        listenScroll: true,
        probeType: 3,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    //!get是对响应式数据的包装，set应该就是怎么获取要包装的响应式数据
    selectedLabel: {
      get() {
        return this.tabs[this.index].label
      },
      set(newVal) {
        this.index = this.tabs.findIndex(v => v.label === newVal)
      }
    }
  },
  mounted() {
    this.onChange(this.index)
  },
  methods: {
    onChange(current) {
      this.index = current
      const instance = this.$refs.component[current]
      if (instance && instance.fetch) {
        instance.fetch()
      }
    },
    onScroll(pos) {
      const tabBarWidth = this.$refs.tabBar.$el.clientWidth
      const sliderWidth = this.$refs.slide.slide.scrollerWidth
      const tabBarScrolldistance = (-pos.x / sliderWidth) * tabBarWidth
      this.$refs.tabBar.setSliderTransform(tabBarScrolldistance)
    }
  }
}
</script>

<style lang="stylus" scoped>
.tab
  display: flex
  flex-direction: column
  height: 100%
  .cube-tab
    padding: 10px 0
  .slide-wrapper
    flex: 1
    overflow: hidden
    //!这一行不可少，否则出现评论页不能滚动，tab切换后商品页购物车栏在视口看不到的布局bug
</style>