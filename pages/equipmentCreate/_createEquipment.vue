<template>
  <div class="w-1/2 mx-auto bg-white p-5 rounded-lg">
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
        <Label html-for="image">Imagem</Label>
        <Input
          id="image"
          v-model="image"
          type="string"
          class="block mt-1 w-full"
          required
          auto-focus
          auto-complete="off"
          placeholder="Inclua o link da imagem"
        />
      </div>

      <div class="mt-4">
        <Label html-for="patrimony">Patrimônio</Label>
        <Input
          id="patrimony"
          v-model="patrimony"
          type="string"
          class="block mt-1 w-full"
          required
          auto-complete="off"
          placeholder="Ex: Braip-1 / Braip-2"
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

export default {
  data: () => ({
    valid: true,
    type: '',
    image: '',
    patrimony: '',
    status: '',
  }),

  methods: {
    submit() {
      const data = {
        type: this.type,
        image: this.image,
        patrimony: this.patrimony,
        status: this.status,
      }

      if (this.valid) {
        this.$axios
          .$post('http://127.0.0.1:8000/api/equipments', data)
          .then(() => {
            alert('Opa, deu tudo certo! Equipamento registrado com sucesso!')
          })
          .catch(() => {
            alert('Ops, algo deu errado! Tente novamente.')
          })

        this.resetForm()
      } else {
        alert('Preencha os campos necessários!')
      }
    },

    resetForm() {
      this.type = ''
      this.image = ''
      this.patrimony = ''
      this.status = ''
    },
  },
}
</script>
