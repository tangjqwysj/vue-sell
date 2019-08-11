<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="(itemClass,index) in itemClasses" :key="index"
          :class="itemClass"></span>
  </div>
</template>

<script>
const LENGTH = 5
const CLS_ON = 'on'
const CLS_OFF = 'off'
const CLS_HALF = 'half'
export default {
  props: {
    size: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starType() {
      return `star-${this.size}`
    },
    itemClasses() {
      let ret = []
      let score = Math.floor(this.score * 2) / 2
      const hasDemical = score % 1 !== 0
      const integer = Math.floor(this.score)
      for (let i = 0; i < integer; i++) {
        ret.push(CLS_ON)
      }
      if (hasDemical) {
        ret.push(CLS_HALF)
      }
      while (ret.length < LENGTH) {
        ret.push(CLS_OFF)
      }
      return ret
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'

.star
  display: flex
  align-items: center
  justify-content: center
  &.star-48
    .star-item
      width: 20px
      height: 20px
      margin-right: 22px
      background-size: 20px 20px
      &:last-child
        margin-right: 0
      &.on
        bg-image('star48_on')
      &.off
        bg-image('star48_off')
      &.half
        bg-image('star48_half')
  &.star-36
    .star-item
      width: 15px
      height: 15px
      margin-right: 6px
      background-size: 15px 15px
      &:last-child
        margin-right: 0
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
  &.star-24
    .star-item
      width: 10px
      height: 10px
      margin-right: 3px
      background-size: 10px 10px
      &:last-child
        margin-right: 0
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
</style>