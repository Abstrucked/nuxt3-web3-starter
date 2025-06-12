<script setup lang="ts">
import Hero from '@/components/common/Hero.vue'
import Section from '@/components/common/Section.vue'
import type { ButtonProps } from '@nuxt/ui';
const links: ButtonProps[] = [
  {
    label: 'Mint',
    to: '/mint',
    variant: 'outline'
  }
]

</script>
<template>
  <UContainer>
    <Hero title="Welcome!" icon="logo_base.png" subtitle="Hero component with links and icon" :links="links"
      class-name="sm:justify-center" variant="outline" color="primary" />
    <Section class-name="p-6 ring-gray-100 dark:ring-gray-800" variant="ring">
      <h5>Section Component</h5>
      <div class="p-4">
        <ul class="list-disc indent-2">
          <li>Allow for variants</li>
          <li>Slot implemented</li>
          <li>Highly customizable</li>
        </ul>
      </div>
    </Section>
  </UContainer>
</template>

<style scoped></style>
