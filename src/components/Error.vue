<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h1>Oops !</h1>
    <div>
        <p>Something went wrong</p>
    </div>
    <router-link ref="homeLink" to="/">Go back to Home</router-link>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style>
</style>
