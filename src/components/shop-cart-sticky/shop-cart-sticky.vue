<template>
  <div class="shop-cart-sticky" v-show="visible">
    <shop-cart :delivery-price='deliveryPrice' :min-price='minPrice' :select-foods='selectFoods'
               :fold="fold" ref="shopCart" :sticky=true></shop-cart>
  </div>
</template>

<script>
import ShopCart from '../shop-cart/shop-cart.vue'
import popupMixin from '../../common/js/popup'
export default {
  name: 'shop-cart-sticky',
  mixins: [popupMixin],
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
    },
    fold: {
      type: Boolean,
      default: true
    },
    list: {
      type: Object,
      default: () => ({})
    }
  },
  methods:{
    drop(el){
      this.$refs.shopCart.drop(el)
    }
  },
  components: {
    ShopCart
  }
}
</script>

<style lang="stylus" scoped>
.shop-cart-sticky
  position: absolute
  left: 0
  bottom: 0
  height: 48px
  width: 100%
  z-index: 999
</style>