<template>
  <div class="goods">
    <div class="scroll-nav-wrapper">
      <cube-scroll-nav :side=true :data='goods' :options="scrollOptions" v-if='goods.length'>
        <template v-slot:bar='props'>
          <cube-scroll-nav-bar :labels='props.labels' :txts='barTxts' :current='props.current'
                               direction='vertical'>
            <template v-slot:default='props'>
              <div class="text">
                <support-ico v-if='props.txt.type>0' :size="3" :type="props.txt.type"></support-ico>
                <span>{{props.txt.name}}</span>
                <span class="num" v-if='props.txt.count'>
                  <bubble :num='props.txt.count'></bubble>
                </span>
              </div>
            </template>
          </cube-scroll-nav-bar>
        </template>
        <cube-scroll-nav-panel v-for="good in goods" :key="good.name" :label='good.name'
                               :title='good.name'>
          <ul>
            <li class="food-item" v-for="food in good.foods" :key="food.name">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cart-control-wrapper">
                  <cart-control :food='food' @add='onAdd'></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice'
                 :select-foods='selectFoods' ref="shopCart"></shop-cart>
    </div>
  </div>
</template>

<script>
import { getGoods } from '../../api/index'
import SupportIco from '../support-ico/support-ico.vue'
import Bubble from '../bubble/bubble.vue'
import CartControl from '../cart-control/cart-control.vue'
import ShopCart from '../shop-cart/shop-cart.vue'
export default {
  name: 'goods',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      goods: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    seller() {
      return this.data.seller
    },
    barTxts() {
      let ret = []
      this.goods.forEach((v, i) => {
        let { name, type, foods } = v
        let count = 0
        foods.forEach((v, i) => {
          count += v.count || 0
        })
        ret.push({
          name,
          type,
          count
        })
      })
      return ret
    },
    selectFoods() {
      let ret = []
      this.goods.forEach((v, i) => {
        v.foods.forEach((vi, ii) => {
          if (vi.count) {
            ret.push(vi)
          }
        })
      })
      return ret
    }
  },
  methods: {
    fetch() {
      if (!this.fetched) {
        this.fetched = true
        getGoods({ id: this.seller.id }).then(goods => {
          this.goods = goods
        })
      }
    },
    onAdd(el) {
      this.$refs.shopCart.drop(el)
    }
  },
  components: {
    SupportIco,
    Bubble,
    CartControl,
    ShopCart
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.goods
  position: relative
  height: 100%
  text-align: left
  .scroll-nav-wrapper
    position: absolute
    top: 0
    left: 0
    width: 100%
    bottom: 48px
    .cube-scroll-nav-bar
      width: 80px
      white-space: normal
      .text
        flex: 1
        position: relative
        .support-ico
          margin-right: 4px
          display: inline-block
          vertical-align: top
        .num
          position: absolute
          top: -12px
          right: -8px
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      position: relative
      &:last-child
        border-none()
        margin-bottom: 0
      .icon
        margin-right: 10px
        flex: 0 0 57px
        img
          height: auto
      .content
        flex: 1
        .name
          font-size: $fontsize-medium
          color: $color-dark-grey
          margin: 2px 0 8px 0
          height: 14px
          line-height: 14px
        .desc, .extra
          font-size: $fontsize-small-s
          color: $color-light-grey
          line-height: 10px
        .desc
          line-height: 12px
          margin-bottom: 8px
        .extra
          .count
            margin-right: 12px
        .price
          font-weight: 700
          line-height: 24px
          height: 24px
          .now
            margin-right: 8px
            font-size: $fontsize-medium
            color: $color-red
          .old
            font-size: $fontsize-small-s
            color: $color-light-grey
            text-decoration: line-through
        .cart-control-wrapper
          position: absolute
          right: 0
          bottom: 12px
  .shop-cart-wrapper
    position: absolute
    left: 0
    bottom: 0
    height: 48px
    width: 100%
    z-index: 50

>>> .cube-scroll-nav-bar-item
  padding: 0 10px
  height: 56px
  display: flex
  align-items: center
  line-height: 14px
  font-size: $fontsize-small
  background: $color-background-ssss

>>> .cube-scroll-nav-bar-item_active
  background: $color-white
  color: $color-dark-grey

>>> .cube-scroll-nav-panel-title
  font-size: $fontsize-small
  color: $color-grey
  background: $color-background-ssss
  height: 26px
  line-height: 26px
  padding-left: 14px
  border-left: 2px solid $color-col-line
</style>