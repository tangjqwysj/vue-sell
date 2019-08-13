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
        <cube-scroll-nav-panel v-for="good in goods" :key="good.name" :label='good.name' :title='good.name'>
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
                <div class="cart-control-w">
                  <cart-control></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </cube-scroll-nav-panel>
      </cube-scroll-nav>
    </div>
    <div class="shop-cart-wrapper">
      <shop-cart></shop-cart>
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
        let count
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
  position:relative
  height:100%
  text-align:left;
  .scroll-nav-wrapper
    position:absolute
    top:0;
    left:0;
    width:100%;
    bottom:48px;
    .cube-scroll-nav-bar
      width:80px;
      white-space:normal;
>>> .cube-scroll-nav-bar-item
      padding:0 10px;
      height:54px;
      display:flex;
      align-items:center;
      line-height:14px;
      font-size:$fontsize-small;
      background:$color-background-ssss
</style>