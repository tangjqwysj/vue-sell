<template>
  <transition name='fade'>
    <div class="header-detail" v-show="visible">
      <div class="detail-wrapper">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size='48' :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports" v-if='seller.supports'>
            <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
              <support-ico :size="2" :type="item.type"></support-ico>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hide">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
</template>

<script>
import popupMixin from '../../common/js/popup'
import SupportIco from '../support-ico/support-ico.vue'
import Star from '../star/star.vue'
export default {
  name: 'header-detail',
  mixins: [popupMixin],
  props: {
    seller: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    Star,
    SupportIco
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.header-detail
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  opacity: 1
  color: $color-white
  background: $color-background-s
  &.fade-enter-active, &.fade-leave-active
    transition: all 0.5s
  &.fade-enter, &.fade-leave-to
    opacity: 0
    background: $color-background
  .detail-wrapper
    width: 100%
    min-height: 100%
    .detail-main
      margin-top: 64px
      padding-bottom: 64px
      .name
        text-align: center
        font-size: $fontsize-large
        font-weight: 700
        line-height: 16px
      .star-wrapper
        margin-top: 18px
        padding: 2px 0
      .title
        display: flex
        align-items: center
        width: 80%
        margin: 28px auto 24px
        .line
          flex: 1
          height: 1px
          background: rgba(255, 255, 255, 0.2)
        .text
          padding: 0 12px
          font-size: $fontsize-medium
          font-weight: 700
      .supports
        width: 80%
        margin: 0 auto
        .support-item
          display: flex
          align-items: center
          padding: 0 12px
          margin-bottom: 12px
          &:last-child
            margin-bottom: 0
          .support-ico
            margin-right: 6px
          .text
            font-size: $fontsize-small
            line-height: 16px
      .bulletin
        width: 80%
        margin: 0 auto
        .content
          padding: 0 12px
          font-size: $fontsize-small
          line-height: 24px
  .detail-close
    position: absolute
    bottom:32px;
    left:50%;
    transform:translateX(-50%)
    font-size: $fontsize-large-xxxx
    clear: both
</style>