<template>
  <div class="category-list">
    <h2 id="title">{{ title }}</h2>
    <div id="list">
      <CategoryItem v-for="project in projects" :key="project.id" :project="project"></CategoryItem>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IProject } from '@/interfaces/Project'
import CategoryItem from '@/components/CategoryItem.vue'

@Component({
  components: {
    CategoryItem
  }
})
export default class CategoryList extends Vue {
  @Prop() private projects!: IProject[];
  @Prop() private title!: string;
}
</script>

<style scoped>
.category-list {
  position: relative;
  width: 100%;
  height: 140px;
  margin-top: 10px;
  margin-bottom: 10px;
}

#title {
  position: relative;
  padding-left: 10px;
  margin-bottom: 10px;
  margin-top: 0;
  font-size: 12px;
}

#list {
  position: absolute;
  width: 100%;
  overflow: auto;
  white-space: nowrap;
}
#list > *:first-child {
  margin-left: 10px;
}
#list > *:last-child {
  margin-right: 10px;
}
#list > * {
  display: inline-block;
  margin-right: 5px;
}
</style>
