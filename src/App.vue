<template>
  <div id="app">
    <v-header :seller='seller'></v-header>
    <div class="tab-wrapper">
      <tab></tab>
    </div>
  </div>
</template>

<script>
import qs from 'query-string'
import { getSeller } from './api/index'
import VHeader from 'components/v-header/v-header.vue'
import Tab from 'components/tab/tab.vue'
export default {
  name: 'app',
  data() {
    return {
      seller: {
        id: qs.parse(location.search).id
      }
    }
  },
  created() {
    this._getSeller()
  },
  methods: {
    _getSeller() {
      getSeller({
        id: this.seller.id
      }).then(seller => {
        this.seller = seller
      })
    }
  },
  components: {
    VHeader,
    Tab
  }
}
</script>
<style lang="stylus">
#app
  .tab-wrapper
    position: fixed
    top: 136px
    left: 0
    bottom: 0
    right: 0
</style>
