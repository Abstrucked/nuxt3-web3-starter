<script setup lang="ts"></script>

<template>
  <UContainer>
    <h1>Mint</h1>
    <UForm>
      <UInput v-model="mintAmount" label="Amount" />
      <UButton @click="mint" :loading="isMinting">Mint</UButton>
    </UForm>
  </UContainer>
</template>

<style scoped></style>
