<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h1>Oops !</h1>
    <div>
        <p>Something went wrong</p>
    </div>
    <router-link to="/">Go back to Home</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  mounted () {
    console.log(this.$route)
  }
}
</script>

<style>
</style>
