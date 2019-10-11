<template>
  <div class="detail-view">
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class DetailView extends Vue {}
</script>

<style scoped>
.detail-view {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  padding: 0px;
  margin: 0px;
}
</style>
