<template>
  <div></div>
</template>

<script>
export default {
  data: () => ({
    equipments: [],
  }),

  mounted() {
    this.fetch()
  },

  methods: {
    async fetch() {
      const response = await this.$axios.$get('/equipments')

      this.equipments = response
    },
  },
}
</script>
