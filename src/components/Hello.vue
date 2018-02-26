<template>
  <!-- if you want automatic padding use "layout-padding" class -->
  <div class="layout-padding">
    <h1>Hello</h1>
    <div>
        <router-link ref="tableLink" to="table">Table</router-link> |
        <router-link ref="formLink" :to="{ name: 'form', params: { id: 12} }">Form</router-link>
    </div>
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
