<template>
  <v-card :color="color" dark>
    <v-card-title class="headline">
      <v-icon x-large :color="colorIcon || 'white'" >{{ icon }}</v-icon>&nbsp;
      <h3>{{ title }}</h3>
      <v-spacer />
      {{ value }}
    </v-card-title>
  </v-card>
</template>

<script>
export default {
  name: 'Stat',
  props: ['title', 'value', 'icon', 'color', 'colorIcon'],
  computed: {
    style() {
      return 'color: ' + (this.color || '#000')
    },
  },
  mounted() {
    console.log('MOUNTED STAT')
  },
}
</script>
