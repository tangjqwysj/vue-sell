<template>
  <transition name="fade">
    <cube-popup type='shop-cart-list' v-show="visible" :z-index=90 position='bottom'
                :mask-closable=true @mask-click='maskClick'>
      <transition name="move" @after-leave='afterLeave'>
        <div v-show="visible">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <div class="empty" @click="empty">清空</div>
          </div>
          <cube-scroll class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food,index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food="food" @add='onAdd'></cart-control>
                </div>
              </li>
            </ul>
          </cube-scroll>
        </div>
      </transition>
    </cube-popup>
  </transition>
</template>

<script>
import popupMixin from '../../common/js/popup'
import CartControl from '../cart-control/cart-control.vue'

const EVENT_ADD = 'add'
const EVENT_SHOW = 'show'
const EVENT_LEAVE = 'leave'

export default {
  name: 'shop-cart-list',
  mixins: [popupMixin],
  props: {
    selectFoods: {
      type: Array,
      default: () => []
    }
  },
  created() {
    //!创造实例的时候添加监听show事件，之后每次监听到show操作都会触发refresh
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.listContent.refresh()
        console.log('show事件')
      })
    })
  },
  methods: {
    maskClick() {
      this.hide()
    },
    onAdd(target) {
      this.$emit(EVENT_ADD, target)
    },
    afterLeave(el) {
      this.$emit(EVENT_LEAVE)
    },
    empty() {
      this.$createDialog({
        type: 'confirm',
        content: '确定清空购物车?',
        onConfirm: () => {
          this.selectFoods.forEach((v, i) => (v.count = 0))
          this.hide()
        }
      }).show()
    }
  },
  components: {
    CartControl
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.cube-shop-cart-list
  bottom: 48px
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.3s
  &.fade-enter, &.fade-leave-to
    opacity: 0
  .move-enter-active, .move-leave-active
    transition: all 0.3s
  .move-enter, .move-leave-to
    transform: translate3d(0, 100%, 0)
  .list-header
    height: 40px
    line-height: 40px
    background: $color-background-ssss
    padding: 0 18px
    display: flex
    justify-content: space-between
    .title
      font-size: $fontsize-medium
      color: $color-dark-grey
    .empty
      font-size: $fontsize-small
      color: $color-blue
  .list-content
    padding: 0 18px
    max-height: 217px
    background: $color-white
    overflow: hidden
    .food
      position: relative
      padding: 12px 0
      .name
        line-height: 24px
        font-size: $fontsize-medium
        color: $color-dark-grey
      .price
        position: absolute
        right: 90px
        bottom: 12px
        line-height: 24px
        font-size: $fontsize-medium
        font-weight: 700
        color: $color-red
      .cart-control-wrapper
        position: absolute
        right: 0
        bottom: 6px
</style>