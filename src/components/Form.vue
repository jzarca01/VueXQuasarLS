<template>
  <div class="layout-padding">
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
      <q-btn ref="submitButton" color="primary" @click="submitPost">Submit</q-btn>
      <q-btn ref="cancelButton" @click="cancelPost">Cancel</q-btn>
    </div>
  </div>
</template>

<script>
import { QInput, QBtn } from 'quasar'
import { mapMutations } from 'vuex'

export default {
  components: {
    QInput,
    QBtn
  },
  props: ['id'],
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
    ...mapMutations('table', {
      addItem: 'addItem'
    }),
    submitPost () {
      this.addItem({item: this.form})
    },
    cancelPost () {
      this.$router.go(-1)
    }
  },
  mounted () {
    console.log('props', this.$route)
  }
}
</script>

<style scoped>
.form {
  margin: 10px;
}
