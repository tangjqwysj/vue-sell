<template>
  <div class="shopcart">
    <div class="content" @click="toggleList">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">
            <bubble :num='totalCount'></bubble>
          </div>
        </div>
        <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payCls">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <div v-for='(ball,index) in balls' :key="index">
        <transition @before-enter='beforeDrop' @enter='dropping' @after-enter='afterDrop'>
          <div class="ball" v-show='ball.show'>
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Bubble from '../bubble/bubble.vue'

const BALL_LENGTH = 10
const BALL_LEFT = 32
const Ball_BOTTOM = 22

function createBalls() {
  let balls = []
  for (let i = 0; i < BALL_LENGTH; i++) {
    balls.push({ show: false })
  }
  return balls
}

export default {
  name: 'shop-cart',
  props: {
    selectFoods: {
      type: Array,
      default: () => []
    },
    deliveryPrice: {
      type: Number,
      default: 4
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: createBalls()
    }
  },
  created() {
    this.dropBalls = []
  },
  computed: {
    totalCount() {
      let count = 0
      this.selectFoods.forEach((v, i) => {
        count += v.count
      })
      return count
    },
    totalPrice() {
      let price = 0
      this.selectFoods.forEach((v, i) => {
        price += v.count * v.price
      })
      return price
    },
    payDesc() {
      if (this.totalPrice <= 0) {
        return '￥20元起送'
      } else if (this.totalPrice < this.minPrice) {
        return `还差${this.minPrice - this.totalPrice}元起送`
      } else {
        return '去结算'
      }
    },
    payCls() {
      return { 'not-enough': this.totalPrice < this.minPrice, enough: this.totalPrice >= this.minPrice }
    }
  },
  methods: {
    toggleList(){
      
    },
    drop(el) {
      for (let i = 0; i < BALL_LENGTH; i++) {
        if (!this.balls[i].show) {
          this.balls[i].show = true
          this.balls[i].el = el
          this.dropBalls.push(this.balls[i])
          return
        }
      }
    },
    beforeDrop(el) {
      const ball = this.dropBalls[this.dropBalls.length - 1]
      const delta_x = ball.el.getBoundingClientRect().left - BALL_LEFT
      const delta_y = -(window.innerHeight - ball.el.getBoundingClientRect().top - Ball_BOTTOM)
      el.style.transform = el.style.webkitTransform = `translate3d(${delta_x}px,0,0)`
      el.querySelectorAll('.inner')[0].style.transform = el.querySelectorAll('.inner')[0].style.webkitTransform = `translate3d(0,${delta_y}px,0)`
    },
    dropping(el, done) {
      this._reflow=document.body.offsetParent
      el.style.transform = el.style.webkitTransform = `translate3d(0,0,0)`
      el.querySelectorAll('.inner')[0].style.transform = el.querySelectorAll('.inner')[0].style.webkitTransform = `translate3d(0,0,0)`
      el.addEventListener('transitionend', done)
    },
    afterDrop(el) {
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  },
  components: {
    Bubble
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.shopcart
  height: 100%
  .content
    display: flex
    background: $color-background
    color: $color-light-grey
    .content-left
      flex: 1
      .logo-wrapper
        display: inline-block
        width: 56px
        height: 56px
        position: relative
        margin: 0 12px
        top: -10px
        padding: 6px
        box-sizing: border-box
        vertical-align: top
        border-radius: 50%
        background: $color-background
        .logo
          width: 100%
          height: 100%
          border-radius: 50%
          text-align: center
          background: $color-dark-grey
          &.highlight
            background: $color-blue
          .icon-shopping_cart
            font-size: $fontsize-large-xxx
            color: $color-light-grey
            line-height: 44px
            &.highlight
              color: $color-white
        .num
          position: absolute
          top: 0
          right: 0
      .price
        display: inline-block
        vertical-align: top
        margin-top: 12px
        font-size: $fontsize-large
        line-height: 24px
        border-right: 1px solid rgba(255, 255, 255, 0.1)
        padding-right: 12px
        font-weight: 700
        &.highlight
          color: $color-white
      .desc
        display: inline-block
        vertical-align: top
        font-size: $fontsize-small-s
        margin: 12px 0 0 12px
        line-height: 24px
    .content-right
      flex: 0 0 105px
      .pay
        font-size: $fontsize-small
        font-weight: 700
        height: 48px
        line-height: 48px
        text-align: center
        &.enough
          background: $color-green
          color: $color-white
        &.not-enough
          background: $color-dark-grey
  .ball-container
    .ball
      position: fixed
      bottom: 22px
      left: 32px
      transition: all 0.4s linear
      .inner
        width: 16px
        height: 16px
        border-radius: 50%
        background: $color-blue
        transition: all 0.4s cubic-bezier(0.48, -0.29, 0.76, 0.43)
</style>