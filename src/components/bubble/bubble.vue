<template>
  <span class="bubble">
    {{num}}
  </span>
</template>

<script>
export default {
  name: 'bubble',
  props: {
    num: {
      type: Number
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'

.bubble
  display: inline-block
  background: $color-red
  font-size: $fontsize-small-s
  font-weight: 700
  text-align: center
  color: $color-white
  padding: 0 5px
  height: 16px
  line-height: 16px
  border-radius: 16px
</style>