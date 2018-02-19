<template>
  <div class="form">
    Id: <q-input
      v-model="form.id"
    />
    User Id: <q-input
      v-model="form.userId"
    />
    Title: <q-input
      v-model="form.title"
    />
    Body: <q-input
      v-model="form.body"
    />
    <q-btn color="primary" @click="submitPost">Submit</q-btn>
    <q-btn @click="cancelPost">Cancel</q-btn>
  </div>
</template>

<script>
import { QInput, QBtn } from 'quasar'

export default {
  components: {
    QInput,
    QBtn
  },
  data () {
    return {
      form: {
        id: 0,
        userId: 0,
        title: '',
        body: ''
      }
    }
  },
  methods: {
    submitPost () {
      this.$parent.addItem({item: this.form})
      this.$parent.toggleEdit(false)
    },
    cancelPost () {
      this.$parent.toggleEdit(false)
    }
  }
}
</script>

<style scoped>
.form {
  margin: 10px;
}
