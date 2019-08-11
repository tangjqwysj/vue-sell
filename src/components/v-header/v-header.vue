<template>
  <div class="header" @click="showDetail">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if='seller.supports' class="support">
          <support-ico :size="1" :type="seller.supports[0].type"></support-ico>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if='seller.supports'>
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <header-detail :seller="seller"></header-detail>
  </div>
</template>

<script>
import SupportIco from '../support-ico/support-ico.vue'
import HeaderDetail from '../header-detail/header-detail.vue'
export default {
  name: 'v-header',
  props: {
    seller: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    showDetail() {
      // this.headerDetailComp =
      //   this.headerDetailComp ||
      //   this.$createHeaderDetail({
      //     $props: {
      //       seller: this.seller
      //     }
      //   })
      // this.headerDetailComp.show()
    }
  },
  components: {
    SupportIco,
    HeaderDetail
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
@import '../../common/stylus/variable.styl'

.header
  position: relative
  overflow: hidden
  color: $color-white
  background: $color-background-ss
  .content-wrapper
    position: relative
    display: flex
    align-items: center
    padding: 24px 12px 18px 24px
    .avatar
      flex: 0 0 64px
      width: 64px
      margin-right: 16px
      img
        border-radius: 2px
    .content
      flex: 1
      .title
        display: flex
        align-items: center
        margin-bottom: 8px
        .brand
          width: 30px
          height: 18px
          background-size: 30px 18px
          bg-image('brand')
        .name
          margin-left: 6px
          font-size: $fontsize-large
          font-weight: bold
      .description
        font-size: $fontsize-small
        margin-bottom: 8px
      .support
        display: flex
        align-items: center
        .support-ico
          margin-right: 4px
        .text
          font-size: $fontsize-small-s
          line-height: 12px
    .support-count
      position: absolute
      right: 12px
      bottom: 14px
      background: $color-background-sss
      display: flex
      align-items: center
      padding: 0 8px
      border-radius: 14px
      height: 24px
      line-height: 24px
      text-align: center
      font-size: $fontsize-small-s
      .icon-keyboard_arrow_right
        margin-left: 2px
  .bulletin-wrapper
    display: flex
    align-items: center
    height: 28px
    line-height: 28px
    padding: 0 8px
    font-size: $fontsize-small-s
    background: $color-background-sss
    .bulletin-title
      width: 22px
      height: 12px
      background-size: 22px 12px
      flex: 0 0 22px
      bg-image('bulletin')
      margin-right: 4px
    .bulletin-text
      flex: 1
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
    .icon-keyboard_arrow_right
      flex: 0 0 10px
  .background
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    filter: blur(10px)
    z-index: -1
</style>