<template>
  <div class="w-1/2 mx-auto mt-20 bg-white p-5 rounded-lg">
    <h1 class="text-2xl font-black">Cadastrar equipamento</h1>
    <form method="post" autoComplete="off" @submit.prevent="submit">
      <div class="mt-20">
        <Label html-for="type">Tipo</Label>
        <Input
          id="type"
          v-model="type"
          type="string"
          class="block mt-1 w-full"
          required
          auto-focus
          auto-complete="off"
          placeholder="Ex: Notebook / Desktop / Impressora"
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
          auto-complete="off"
          placeholder="Ex: Disponível / Indisponível"
        />
      </div>

      <div class="flex items-center justify-end mt-4">
        <Button :click="submit" class="ml-3">Registrar equipamento</Button>
      </div>
    </form>
  </div>
</template>

<script>
import Vue from 'vue'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(VueSweetalert2)

export default {
  data: () => ({
    valid: true,
    type: '',
    patrimony: '',
    status: '',
  }),

  methods: {
    submit() {
      const data = {
        type: this.type,
        patrimony: this.patrimony,
        status: this.status,
      }

      if (this.valid) {
        this.$swal({
          title: 'Equipamento criado com sucesso!',
          type: 'success',
          showConfirmButton: false,
          timer: 2000,
        })

        this.$axios.$post('http://127.0.0.1:8000/api/equipments', data)

        this.$router.push('/equipments')
      } else {
        this.$swal({
          title: 'Erro ao criar conta!',
          text: 'Por favor, tente novamente.',
          type: 'error',
          showConfirmButton: false,
          timer: 2000,
        })
      }
    },

    resetForm() {
      this.type = ''
      this.patrimony = ''
      this.status = ''
    },
  },
}
</script>
