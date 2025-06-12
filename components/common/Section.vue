<script setup lang="ts">

const { className, variant } = defineProps<{
  className?: string,
  variant?: 'ring' | 'background' | 'none'
}>()

const { classLink } = helpers()

const classes = computed(() => {
  return classLink([
    'rounded-lg',
    variant === 'ring' ? 'ring-2 ring-gray-800' : '',
    variant === 'background' ? 'bg-gray-800' : '',
    'p-6 my-6',
    className ? className : ''
  ])
})
</script>

<template>
  <section :class="classes">
    <div class="flex flex-col items-center justify-center gap-4 lg:gap-8 lg:items-start ">
      <slot />
    </div>
  </section>
</template>

<style scoped></style>
