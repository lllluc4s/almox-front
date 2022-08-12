<template>
  <div class="w-1/2 mx-auto bg-white p-5 mt-40 rounded-lg">
    <form method="post" autoComplete="off" @submit.prevent="submit">
      <div class="mt-4">
        <Label html-for="type">Tipo do equipamento</Label>
        <Input
          id="type"
          v-model="type"
          type="string"
          class="block mt-1 w-full"
          required
          auto-focus
        />
      </div>

      <div class="mt-4">
        <Label html-for="status">Status</Label>
        <Input
          id="status"
          v-model="status"
          type="string"
          class="block mt-1 w-full"
          required
          auto-focus
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <Button :click="submit" class="ml-3">Editar equipamento</Button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)

export default {
  middleware: 'auth',

  data: () => ({
    valid: true,
    type: '',
    status: '',
  }),

  methods: {
    submit() {
      const data = {
        type: this.type,
        status: this.status,
      }

      if (this.valid) {
        this.$axios
          .$put('/equipments/' + this.$route.params.id, data)
          .then(() => {
            this.$swal({
              title: 'Sucesso!',
              text: 'Equipamento editado com sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            }).then(() => {
              this.$router.push('/equipments')
            })
          })
          .catch(() => {
            this.$swal({
              title: 'Erro!',
              text: 'Erro ao editar equipamento!',
              icon: 'error',
              confirmButtonText: 'Ok',
            })
          })

        this.resetForm()
      } else {
        alert('Preencha os campos necessários!')
      }
    },

    resetForm() {
      this.type = ''
      this.status = ''
    },
  },
}
</script>
