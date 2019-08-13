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
</style>