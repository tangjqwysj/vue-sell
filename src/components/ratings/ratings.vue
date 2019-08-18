<template>
  <cube-scroll ref="scroll" class="ratings" :options='scrollOptions'>
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :score="seller.serviceScore" :size="36"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :score="seller.foodScore" :size="36"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select :selectType='selectType' :onlyContent="onlyContent" :ratings="ratings"
                     @select='onSelect' @toggle='onToggle'></rating-select>
      <div class="rating-wrapper">
        <ul>
          <li class="rating-item border-bottom-1px" v-for="(rating,index) in computedRatings"
              :key="index">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :score="rating.score" :size="24"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend&&rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="(item,index) in rating.recommend" :key="index">
                  {{item}}
                </span>
              </div>
              <div class="time">
                {{fromat(rating.rateTime)}}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import Star from '../star/star.vue'
import Split from '../split/split.vue'
import RatingSelect from '../rating-select/rating-select.vue'
import { getRatings } from '../../api/index'
import ratingsMixin from '../../common/js/ratings'
import moment from 'moment'
export default {
  name: 'ratings',
  mixins: [ratingsMixin],
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      ratings: [],
      scrollOptions: {
        click: false,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    seller() {
      return this.data.seller || {}
    }
  },
  methods: {
    fetch() {
      if (!this.fetched) {
        this.fetched = true
        getRatings({
          id: this.seller.id
        }).then(ratings => {
          this.ratings = ratings
        })
      }
    },
    fromat(time) {
      return moment(time).format('YYYY-MM-DD HH:mm')
    }
  },
  watch: {
    selectType(newVal) {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },
  components: {
    Star,
    Split,
    RatingSelect
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.ratings
  height: 100%
  position: relative
  white-space: normal
  .overview
    display: flex
    padding: 18px 0
    .overview-left
      flex: 0 0 137px
      border-right: 1px solid $color-col-line
      text-align: center
      padding: 6px 0
      @media only screen and (max-width: 320px)
        flex: 0 0 120px
      .score
        font-size: $fontsize-large-xxx
        line-height: 28px
        color: $color-orange
        margin-bottom: 6px
      .title
        font-size: $fontsize-small
        line-height: 12px
        margin-bottom: 8px
        color: $color-dark-grey
      .rank
        font-size: $fontsize-small-s
        line-height: 10px
        color: $color-light-grey
    .overview-right
      flex: 1
      padding: 6px 0 6px 24px
      .score-wrapper
        display: flex
        align-items: center
        margin-bottom: 8px
        .title
          font-size: $fontsize-small
          line-height: 18px
          color: $color-dark-grey
        .star
          margin: 0 12px
        .score
          font-size: $fontsize-small
          color: $color-orange
          line-height: 18px
      .delivery-wrapper
        display: flex
        align-items: center
        .title
          font-size: $fontsize-small
          color: $color-dark-grey
          line-height: 18px
        .delivery
          margin-left: 12px
          font-size: $fontsize-small
          color: $color-light-grey
  .rating-wrapper
    padding: 0 18px
    .rating-item
      display: flex
      padding: 18px 0
      &:last-child
        border-none()
      .avatar
        flex: 0 0 28px
        margin-right: 12px
        img
          border-radius: 50%
      .content
        flex: 1
        position: relative
        .name
          font-size: $fontsize-small-s
          color: $color-dark-grey
          line-height: 12px
          margin-bottom: 4px
        .star-wrapper
          margin-bottom: 6px
          display: flex
          align-items: center
          .star
            margin-right: 6px
          .delivery
            font-size: $fontsize-small-s
            color: $color-light-grey
        .text
          font-size: $fontsize-small
          color: $color-dark-grey
          line-height: 18px
          margin-bottom: 8px
        .recommend
          display: flex
          align-items: center
          flex-wrap: wrap
          line-height: 16px
          .icon-thumb_up, .item
            font-size: $fontsize-small-s
            margin: 0 8px 4px 0
          .icon-thumb_up
            color: $color-blue
          .item
            padding: 0 6px
            background: $color-white
            border: 1px solid $color-row-line
            color: $color-light-grey
        .time
          position: absolute
          top: 0
          right: 0
          font-size: $fontsize-small
          color: $color-light-grey
          line-height: 12px
</style>