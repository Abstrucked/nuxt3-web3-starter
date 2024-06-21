<script setup lang="ts">
import helpers from "../../utils/helpers";
import type {Link} from "@/types/ui";

const props = defineProps<{
  title: string,
  subtitle: string,
  icon: string,
  links?: Array<Link>,
  className?: string,
  backgroundColor?: string | Array<string>
}>()

const {classLink} = helpers()

console.log(props.links)

</script>

<template>
  <div :class="classLink(['w-full rounded-lg p-12', backgroundColor, className ? className : ''])">
    <div class="flex flex-col items-start justify-center w-100 font-['Pixi']  ">
      <div class="flex flex-col lg:flex-row lg:gap-2 lg:items-center">
        <NuxtImg :src="icon" alt="Logo" width="100" height="100"/>
        <h1 class="font-bold ">{{ title }}</h1>
      </div>
      <h4 class="">{{ subtitle }}</h4>
      <div class="flex justify-start md:justify-end w-full md:p-6 mt-4">

        <div class="flex flex-wrap gap-1  md:gap-2">
          <UButton
              v-for="link in links" :key="link.to" :to="link.to" class="flex gap-2 text-lg md:text-xl"
              :color="link.color ? link.color : 'primary'"
              :variant="link.variant ? link.variant : 'link'"
              :label="link.name" size="sm">
            <template #trailing v-if="typeof link.icon == 'string'">
              <UIcon :name="link.icon as string" class="w-5 h-5" dynamic/>
            </template>
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
