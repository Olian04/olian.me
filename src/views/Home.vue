<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="signIn">Sign in</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import { signIn } from '../firebase/auth'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
  public async signIn () {
    try {
      const result = await signIn('github')

      if (result.credential !== null) {
        // This gives you a GitHub Access Token. You can use it to access the GitHub API.

        // @ts-ignore
        const token = result.credential.accessToken

        console.log(token)
      }

      // The signed-in user info.
      const user = result.user
      if (user !== null) {
        console.log(user)
      }
    } catch (err) {
      // Login failed
      console.error(err)
    }
  }
}
</script>
