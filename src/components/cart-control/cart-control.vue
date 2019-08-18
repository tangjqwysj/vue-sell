<template>
  <div class="cart-control">
    <transition name='move'>
      <div class="cart-decrease" v-show="food.count>0" @click.stop='decrease'>
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop='add'></div>
  </div>
</template>

<script>
const EVENT_ADD = 'add'
export default {
  name: 'cart-control',
  props: {
    food: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    decrease() {
      if (this.food.count) {
        this.food.count--
      }
    },
    add(e) {
      if (!this.food.count) {
        this.$set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit(EVENT_ADD, e.target)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'

.cart-control
  display: flex
  align-items: center
  .cart-decrease
    padding: 6px
    &.move-enter-active, &.move-leave-active
      transition: all 0.4s
      .inner
        transition: all 0.4s
    &.move-enter, &.move-leave-to
      transform: translate3d(24px, 0, 0)
      opacity: 0
      .inner
        transform: rotate(180deg)
    .inner
      display: inline-block
      font-size: $fontsize-large-xxx
      color: $color-blue
      transform: rotate(0)
  .cart-count
    font-size: $fontsize-small-s
    color: $color-grey
    width: 12px
    text-align: center
  .cart-add
    font-size: $fontsize-large-xxx
    color: $color-blue
    padding: 6px
</style>