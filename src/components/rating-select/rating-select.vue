<template>
  <div class="rating-select">
    <div class="rating-type border-bottom-1px">
      <span @click="select(2)" class="block positive" :class="{'active':selectType===2}">
        {{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" @click="select(0)" :class="{'active':selectType===0}">
        {{desc.positive}}<span class="count">{{positives.length}}</span>
        <!-- span跟在{{}}后面可以消除空格 -->
      </span>
      <span class="block negative" @click="select(1)" :class="{'active':selectType===1}">
        {{desc.negative}}<span class="count">{{negatives.length}}</span>
      </span>
    </div>
    <div class="switch" @click="toggleContent" :class="{'on':onlyContent===true}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

const EVENT_TOGGLE = 'toggle'
const EVENT_SELECT = 'select'
export default {
  props: {
    ratings: {
      type: Array,
      default: () => []
    },
    selectType: {
      type: Number,
      default: ALL
    },
    onlyContent: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      default: () => ({
        all: '全部',
        positive: '满意',
        negative: '不满意'
      })
    }
  },
  computed: {
    positives() {
      return this.ratings.filter((v, i) => v.rateType === POSITIVE)
    },
    negatives() {
      return this.ratings.filter((v, i) => v.rateType === NEGATIVE)
    }
  },
  methods: {
    toggleContent() {
      this.$emit(EVENT_TOGGLE)
    },
    select(type) {
      this.$emit(EVENT_SELECT, type)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/variable.styl'
@import '../../common/stylus/mixin.styl'

.rating-select
  .rating-type
    padding: 18px 0
    margin: 0 18px
    .block
      display: inline-block
      margin-right: 8px
      padding: 8px 12px
      line-height: 16px
      font-size: $fontsize-small
      border-radius: 1px
      color: $color-grey
      &.active
        color: $color-white
      .count
        margin-left: 2px
      &.positive
        background: $color-light-blue
        &.active
          background: $color-blue
      &.negative
        background: $color-light-grey-s
        &.active
          background: $color-grey
  .switch
    display: flex
    align-items: center
    padding: 12px 18px
    line-height: 24px
    border-bottom: 1px solid $color-row-line
    color: $color-light-grey
    &.on
      .icon-check_circle
        color: $color-green
    .icon-check_circle
      font-size: $fontsize-large-xxx
      margin-right: 4px
    .text
      font-size: $fontsize-small
</style>