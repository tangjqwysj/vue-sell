const ALL = 2
export default {
  data() {
    return {
      selectType: ALL,
      onlyContent: true
    }
  },
  computed: {
    computedRatings() {
      let ret = []
      this.ratings.forEach((v, i) => {
        if (this.onlyContent && v.text === '') {
          return
        }
        if (this.selectType === ALL || this.selectType === v.rateType) {
          ret.push(v)
        }
      })
      return ret
    }
  },
  methods: {
    onToggle() {
      this.onlyContent = !this.onlyContent
    },
    onSelect(type) {
      this.selectType = type
    }
  }
}
