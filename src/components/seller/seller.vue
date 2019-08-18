<template>
  <cube-scroll class="seller" :options='sellerScrollOptions'>
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-bottom-1px">
          <star :score='seller.score' :size='36'></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <span class="icon-favorite" :class="{'active':favorite}"></span>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-bottom-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if='seller.supports'>
          <li class="support-item border-bottom-1px" v-for="(item,index) in seller.supports"
              :key="index">
            <support-ico :type="item.type" :size="4"></support-ico>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <cube-scroll class="pic-wrapper" :options='picScrollOptions'>
          <ul>
            <li class="pic-item" v-for="(item,index) in seller.pics" :key="index">
              <img :src="item" width="120" height="90">
            </li>
          </ul>
        </cube-scroll>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-bottom-1px">商家信息</h1>
        <ul>
          <li class="info-item border-bottom-1px" v-for="(item,index) in seller.infos" :key="index">
            {{item}}
          </li>
        </ul>
      </div>
    </div>
  </cube-scroll>
</template>

<script>
import Split from '../split/split.vue'
import Star from '../star/star.vue'
import SupportIco from '../support-ico/support-ico.vue'
import { saveToLocal, loadFromLocal } from '../../common/js/storage'
export default {
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      favorite: false,
      sellerScrollOptions: {
        directionLockThreshold: 0,
        click: false
      },
      picScrollOptions: {
        scrollX: true,
        stopPropagation: true,
        directionLockThreshold: 0
      }
    }
  },
  computed: {
    seller() {
      return this.data.seller
    },
    favoriteText() {
      return this.favorite ? '已收藏' : '未收藏'
    }
  },
  created() {
    this.favorite = loadFromLocal(this.seller.id, 'favorite', false)
  },
  methods: {
    toggleFavorite() {
      this.favorite = !this.favorite
      saveToLocal(this.seller.id, 'favorite', this.favorite)
    }
  },
  components: {
    Split,
    Star,
    SupportIco
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.seller
  height: 100%
  text-align: left
  .overview
    position: relative
    padding: 18px
    .title
      font-size: $fontsize-medium
      color: $color-dark-grey
      line-height: 14px
      margin-bottom: 8px
    .desc
      display: flex
      align-items: center
      padding-bottom: 18px
      .star
        margin-right: 8px
      .text
        font-size: $fontsize-small-s
        color: $color-grey
        margin-right: 12px
        line-height: 18px
    .remark
      display: flex
      padding-top: 18px
      .block
        flex: 1
        text-align: center
        border-right: 1px solid $color-col-line
        &:last-child
          border: none
        h2
          margin-bottom: 4px
          font-size: $fontsize-small-s
          color: $color-light-grey
        .content
          font-size: $fontsize-small-s
          color: $color-dark-grey
          line-height: 24px
          .stress
            font-size: $fontsize-large-xxx
    .favorite
      position: absolute
      top: 18px
      right: 11px
      width: 50px
      text-align: center
      .icon-favorite
        font-size: $fontsize-large-xxx
        color: $color-light-grey-s
        display: block
        margin-bottom: 4px
        &.active
          color: $color-red
      .text
        font-size: $fontsize-small-s
        color: $color-grey
  .bulletin
    padding: 18px 18px 0 18px
    white-space: normal
    .title
      font-size: $fontsize-medium
      color: $color-dark-grey
      margin-bottom: 8px
    .content-wrapper
      padding: 0 12px 16px 12px
      .content
        font-size: $fontsize-small
        color: $color-red
        line-height: 24px
    .supports
      .support-item
        display: flex
        align-items: center
        padding: 16px 12px
        &:last-child
          border-node()
        .support-ico
          margin-right: 6px
        .text
          font-size: $fontsize-small
          color: $color-dark-grey
          line-height: 16px
  .pics
    padding: 18px
    .title
      font-size: $fontsize-medium
      color: $color-dark-grey
      margin-bottom: 12px
    .pic-wrapper
      display: flex
      align-items: center
      .pic-item
        display: inline-block
        margin-right: 6px
        width: 120px
        height: 90px
        &:last-child
          margin: 0
  .info
    padding: 18px 18px 0 18px
    color: $color-dark-grey
    .title
      font-size: $fontsize-medium
      padding-bottom: 12px
    .info-item
      padding: 16px 12px
      font-size: $fontsize-small
      line-height: 16px
      &:last-child
        border-none()
</style>