<script setup lang="ts">
const state = reactive({
  mintAmount: 1,
  isMinting: false

});
const mint = () => {
  state.isMinting = true;
  setTimeout(() => {
    state.isMinting = false;
  }, 2000);
}
</script>
<template>
  <UContainer>
    <h1>Mint</h1>
    <UForm :state="state" >
      <UInput v-model="state.mintAmount" label="Amount" :disabled="state.isMinting" />
      <UButton @click="mint" :loading="state.isMinting">Mint</UButton>
    </UForm>
  </UContainer>
</template>

<style scoped></style>
