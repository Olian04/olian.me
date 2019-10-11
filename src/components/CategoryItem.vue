<template>
  <div class="category-item"
    :style="{
      '--img': `url(${project.imageURL})`,
    }">
    <div class="content">
      <h4 id="title" v-if=" !project.options.imageContainsTitle ">{{ project.title }}</h4>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IProject } from '@/interfaces/Project'

@Component({
})
export default class CategoryItem extends Vue {
  @Prop() private project!: IProject;
}
</script>

<style scoped>
.category-item {
  position: relative;
  height: 100px;
  width: 150px;
  border: 1px solid #1A1A1A;
  background-color: #1A1A1A;
}
.category-item::before {
  content: "";
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background-image: var(--img);
  background-repeat: repeat-y;
  background-position: center;
  background-size: contain;
  filter: grayscale(100%) blur(2px);
}
.content {
  position: relative;
  height: 100%;
  width: 100%;
  background-image: var(--img);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  text-align: center;
}

#title {
  position: absolute;
  padding: 0px;
  margin: 0px;
  bottom: 0px;
  left: 0px;
  padding-bottom: 2px;
  width: 100%;
  font-size: 18px;
}
</style>
