<template>
  <div class="layout-padding">
    <div>
      <q-btn color="primary" ref="loadingButton" @click="toggleLoading(!state.toggleLoading)">Toggle loading</q-btn>
      <div v-if="state.toggleLoading" class="layout-padding">
        <q-spinner color="primary" :size="50" />
      </div>
      <div class="content" v-else>
          <q-btn class="btn" ref="editButton" color="primary" @click="gotoForm()">Add post</q-btn>
          <q-data-table
              v-if="state.columns && state.columns.length"
              :data="state.items"
              :columns="state.columns">
              <!-- Custom renderer for "title" column -->
              <template slot="col-title" slot-scope="cell">
                  <span class="light-paragraph">{{cell.data}}</span>
              </template>
          </q-data-table>
      </div>
    </div>
  </div>
</template>

<script>
import {
  QBtn,
  QDataTable,
  QSpinner
} from 'quasar'
import FormComponent from './Form'

import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'index',
  components: {
    QSpinner,
    QBtn,
    QDataTable,
    FormComponent
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('table', {
      state: 'getState',
      currentMetadataVersion: 'getMetadata'
    })
  },
  methods: {
    ...mapMutations('table', {
      addItem: 'addItem',
      toggleLoading: 'toggleLoading'
    }),
    ...mapActions('table', {
      getMetadata: 'fetchMetadata',
      getData: 'fetchData'
    }),
    gotoForm () {
      this.$router.push({ name: 'form', params: { id: 12 } })
    }
  },
  mounted () {
    if (!this.state.version) {
      this.getMetadata()
        .then(() => this.getData())
    }
    else {
      this.getData(this.state.version)
    }
  }
}
</script>

<style scoped>
.content {
  margin-top: 10px;
  vertical-align: middle;
  padding: 20px;
}

.content .btn {
  margin: 5px;
}
</style>