<template>
  <transition name="move" @after-leave='afterLeave'>
    <div class="food" v-show="visible">
      <cube-scroll ref="scroll">
        <div class="food-content">
          <div class="image-header">
            <img :src="food.image">
            <div class="back" @click="hide">
              <i class="icon-arrow_lift"></i>
            </div>
          </div>
          <div class="content">
            <h1 class="title">{{food.name}}</h1>
            <div class="detail">
              <span class="sell-count">月售{{food.sellCount}}份</span>
              <span class="rating">好评率{{food.rating}}%</span>
            </div>
            <div class="price">
              <span class="now">￥{{food.price}}</span>
              <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
            </div>
            <div class="cart-control-wrapper">
              <cart-control :food="food" @add='onAdd'></cart-control>
            </div>
            <transition name='fade'>
              <div class="buy" v-show="!food.count" @click="addFirst">加入购物车</div>
            </transition>
          </div>
          <split v-show="food.info"></split>
          <div class="info" v-show="food.info">
            <h1 class="title">商品信息</h1>
            <p class="text">{{food.info}}</p>
          </div>
          <split></split>
          <div class="rating">
            <h1 class="title">商品评价</h1>
            <rating-select :onlyContent="onlyContent" :selectType="selectType" :ratings="ratings"
                           :desc="desc" @select='onSelect' @toggle='onToggle'></rating-select>
            <div class="rating-wrapper">
              <ul v-show="computedRatings||computedRatings.length">
                <li class="rating-item border-bottom-1px" v-for="(rating,index) in computedRatings"
                    :key="index">
                  <div class="user">
                    <span class="name">{{rating.username}}</span>
                    <img :src="rating.avatar" class="avatar" width="12" height="12">
                  </div>
                  <div class="time">{{format(rating.rateTime)}}</div>
                  <p class="text">
                    <span :class="{'icon-thumb_up':rating.rateType===0,
                    'icon-thumb-dowm':rating.rateType===1}"></span>
                    {{rating.text}}
                  </p>
                </li>
              </ul>
              <div class="no-rating" v-show="!computedRatings||!computedRatings.length">
                暂无评价
              </div>
            </div>
          </div>
        </div>
      </cube-scroll>
    </div>
  </transition>
</template>

<script>
import popupMixin from '../../common/js/popup'
import CartControl from '../cart-control/cart-control.vue'
import Split from '../split/split.vue'
import RatingSelect from '../rating-select/rating-select.vue'
import moment from 'moment'
import ratingsMixin from '../../common/js/ratings'

const EVENT_ADD = 'add'
const EVENT_SHOW = 'show'
const EVENT_LEAVE = 'leave'

export default {
  name: 'food',
  mixins: [popupMixin, ratingsMixin],
  props: {
    food: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      desc: {
        all: '全部',
        positive: '推荐',
        negative: '吐槽'
      }
    }
  },
  computed: {
    ratings() {
      return this.food.ratings
    }
  },
  created() {
    this.$on(EVENT_SHOW, () => {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    })
  },
  methods: {
    onAdd(el) {
      this.$emit(EVENT_ADD, el)
    },
    format(time) {
      return moment(time).format('YYYY-MM-DD hh:mm')
    },
    addFirst(e) {
      this.$set(this.food, 'count', 1)
      this.$emit(EVENT_ADD, e.target)
    },
    afterLeave() {
      this.$emit(EVENT_LEAVE)
    }
  },
  components: {
    CartControl,
    Split,
    RatingSelect
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.food
  position: fixed
  top: 0
  left: 0
  bottom: 48px
  width: 100%
  z-index: 30
  background: $color-white
  &.move-enter-active, &.move-leave-active
    transition: all 0.3s
  &.move-enter, &.move-leave-to
    transform: translate3d(100%, 0, 0)
  .image-header
    position: relative
    width: 100%
    height: 0
    padding-top: 100%
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    .back
      position: absolute
      top: 10px
      left: 0
      .icon-arrow_lift
        display: block
        padding: 10px
        font-size: $fontsize-large-xx
        color: $color-white
  .content
    padding: 18px
    position: relative
    .title
      font-size: $fontsize-medium
      line-height: 14px
      color: $color-dark-grey
      margin-bottom: 8px
      font-weight: 700
    .detail
      margin-bottom: 18px
      line-height: 10px
      height: 10px
      .sell-count, .rating
        font-size: $fontsize-small-s
        color: $color-light-grey
      .sell-count
        margin-right: 12px
    .price
      font-weight: 700
      line-height: 24px
      height: 24px
      .now
        font-size: 14px
        margin-right: 8px
        color: $color-red
      .old
        font-size: $fontsize-small-s
        color: $color-light-grey
        text-decoration: line-through
    .cart-control-wrapper
      position: absolute
      right: 12px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      font-size: $fontsize-small-s
      color: $color-white
      padding: 0 12px
      background: $color-blue
      height: 24px
      line-height: 24px
      border-radius: 12px
      z-index: 10
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.3s
      &.fade-enter, &.fade-leave-to
        opacity: 0
  .info
    padding: 18px
    .title
      font-size: $fontsize-medium
      color: $color-dark-grey
      margin-bottom: 6px
    .text
      font-size: $fontsize-small
      color: $color-grey
      padding: 0 8px
      line-height: 24px
  .rating
    padding-top: 18px
    .title
      font-size: $fontsize-medium
      color: $color-dark-grey
      margin-left: 18px
    .rating-wrapper
      padding: 0 18px
      .rating-item
        padding: 16px 0
        position: relative
        &:last-child
          border-none()
        .user
          position: absolute
          top: 16px
          right: 0
          display: flex
          align-items: center
          line-height: 12px
          .name
            font-size: $fontsize-small-s
            color: $color-light-grey
            margin-right: 6px
          .avatar
            border-radius: 50%
        .time
          font-size: $fontsize-small-s
          color: $color-light-grey
          margin-bottom: 6px
          line-height: 12px
        .text
          font-size: $fontsize-small
          color: $color-dark-grey
          line-height: 16px
          .icon-thumb-dowm, .icon-thumb_up
            margin-right: 4px
          .icon-thumb_up
            color: $color-blue
          .icon-thumb-dowm
            color: $color-light-grey
    .no-rating
      padding: 16px 0
      font-size: $fontsize-small
      color: $color-light-grey
</style>
