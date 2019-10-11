<template>
  <div class="list-view">
      <CategoryList :projects="npmProjects" :title="'NPM Projects'"></CategoryList>
      <CategoryList :projects="npmProjects" :title="'NPM Projects'"></CategoryList>
      <CategoryList :projects="npmProjects" :title="'NPM Projects'"></CategoryList>
      <CategoryList :projects="npmProjects" :title="'NPM Projects'"></CategoryList>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CategoryList from '@/components/CategoryList.vue'
import { IProject } from '../interfaces/Project'

@Component({
  components: {
    CategoryList
  }
})
export default class ListView extends Vue {
  public npmProjects: IProject[] = [
    {
      id: 1,
      title: 'Better Logging',
      options: {
        imageContainsTitle: false
      },
      description: 'better-logging is a drop in replacement for the default logging methods of node.js',
      imageURL: 'https://raw.githubusercontent.com/Olian04/better-logging/master/images/output.png'
    },
    {
      id: 2,
      title: 'Brynja',
      options: {
        imageContainsTitle: true
      },
      description: 'Brynja is a virtual DOM implementation with a declarative chaining based javascript API.',
      imageURL: 'https://raw.githubusercontent.com/Olian04/brynja/master/assets/brynja_logo.png'
    },
    {
      id: 3,
      title: 'Better Logging',
      options: {
        imageContainsTitle: false
      },
      description: 'better-logging is a drop in replacement for the default logging methods of node.js',
      imageURL: 'https://raw.githubusercontent.com/Olian04/better-logging/master/images/output.png'
    },
    {
      id: 4,
      title: 'Better Logging',
      options: {
        imageContainsTitle: false
      },
      description: 'better-logging is a drop in replacement for the default logging methods of node.js',
      imageURL: 'https://raw.githubusercontent.com/Olian04/better-logging/master/images/output.png'
    }
  ];
}
</script>

<style scoped>
.list-view {
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0px;
  left: 0px;
  padding: 0px;
  margin: 0px;
}
</style>
