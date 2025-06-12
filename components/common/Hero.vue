<script setup lang="ts">
import type { ButtonProps } from "@nuxt/ui";
import helpers from "../../utils/helpers";


const { variant, className } = defineProps<{
  title: string,
  subtitle: string,
  icon: string,
  links?: Array<ButtonProps>,
  className?: string,
  variant?: 'transparent' | 'background' | 'outline',
}>()

const { classLink } = helpers()

const classes = computed(() => classLink([
  'p-4 rounded-lg',
  variant === 'transparent' ? 'bg-transparent' : '',
  variant === 'background' ? `bg-primary-500 dark:bg-gray-900` : '',
  variant === 'outline' ? `ring-2 ring-gray-400 dark:ring-gray-800` : '',
  className ? className : ''
]))


</script>

<template>
  <div :class="classes">
    <div class="flex flex-col items-start justify-center w-full ">
      <div class="flex flex-col sm:flex-row sm:gap-2 sm:items-center">
        <NuxtImg :src="icon" alt="Logo" width="100" height="100" />
        <h1 class="font-bold text-4xl lg:text-7xl ">{{ title }}</h1>
      </div>
      <h2 class="text-lg">{{ subtitle }}</h2>
      <div class="flex justify-start sm:justify-end w-full md:p-6 mt-4 ">

        <div class="flex flex-wrap gap-1  md:gap-2">
          <UButton v-for="link in links" :key="link.to as string" :to="link.to" class="flex gap-2 text-lg md:text-xl"
            :color="link.color ? link.color : 'primary'" :variant="link.variant ? link.variant : 'link'"
            :label="link.label" size="lg">
            <template #trailing v-if="typeof link.icon == 'string'">
              <UIcon :name="link.icon as string" class="w-5 h-5" dynamic />
            </template>
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
