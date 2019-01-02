<template>
  <mdb-alert :color="color"
    v-if="p1"
    @closeAlert="p1=false"
    dismiss
    class="alert"
    leaveAnimation="fadeOutUp"
  >
    {{message}}
  </mdb-alert>
</template>

<script>
import { mdbAlert } from 'mdbvue'

export default {
  name: 'alert',
  props: ['message', 'color'],
  components: {
    mdbAlert
  },
  data () {
    return {
      p1: true
    }
  }
}
</script>

<style>
.alert {
  margin-top: 1em;
  width: 98%;
  margin-left: auto;
  margin-right: auto;
}
</style>
