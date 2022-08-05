<template>
  <div>
    <template v-if="$auth.user">
      <div class="flex justify-evenly hover: mt-40">
        <h1 class="text-4xl font-black mt-40 mb-20 flex justify-center">
          Bem-vindo, {{ $auth.user.name }} !
        </h1>

        <img
          src="https://media.discordapp.net/attachments/993924903298404463/1005187350168604752/10.png"
          alt="Imagem de apresentação"
        />
      </div>
    </template>

    <template v-else>
      <div class="mt-40">
        <h1 class="text-4xl font-black mb-10 flex justify-center">
          Bem-vindo!
        </h1>
        <h4 class="text-3xl mb-10 flex justify-center">
          Sistema de Almoxarifado
        </h4>
        <p class="text-2xl mt-40 flex justify-center">
          Faça login para acessar o sistema.
        </p>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data: () => ({}),

  mounted() {},

  methods: {},
}
</script>
