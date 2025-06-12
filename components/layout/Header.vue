<script lang="ts" setup>
import { useDevice } from "~/composables/useDevice";
import Connect from "~/components/wallet/Connect.vue";

const { isMobile, isTablet } = useDevice();
const links = [
  { name: 'Home', to: '/' },
  { name: 'Mint', to: '/mint' },
  { name: "About", to: '/about' }
];

const isMenuOpen = ref(false);
const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value;

</script>

<template>
  <header class="w-full p-6">
    <ClientOnly>
      <UContainer>
        <nav
          class="flex flex-col text-2xl font-bold w-full gap-6 items-center justify-between md:flex-row md:justify-center">
          <div class="w-full flex flex-between md:w-auto">
            <div class="flex flex-row flex-auto w-full items-center justify-around lg:justify-start lg:w-50">
              <picture class="logo md:flex flex-start">
                <NuxtImg src="logo_base_64x64.png" alt="Logo" width="64" height="64" />
              </picture>
              <button v-show="isMobile || isTablet" @click="toggleMenu">
                <UIcon :name="isMenuOpen ? 'ep:close' : 'fluent-mdl2:numbered-list-text-mirrored'" dynamic />
              </button>
            </div>
          </div>
          <div v-if="!isTablet || isMenuOpen"
            class="flex flex-auto flex-col gap-6 items-center justify-between lg:flex-row ">
            <div class="flex gap-6 flex-col lg:flex-row ">
              <ULink v-for="link in links" :key="link.to" :to="link.to" active-class="text-primary"
                inactive-class="text-gray-300 dark:text-gray-400 hover:text-gray-500 dark:hover:text-gray-200">{{
                  link.name }}
              </ULink>
            </div>
            <Connect />
          </div>
          <div>
            <ThemeSwitch />
          </div>
        </nav>
      </UContainer>
    </ClientOnly>
  </header>
</template>

<style scoped>
connect {
  border-top: 1px solid white;
  display: flex;
  justify-self: flex-end;
  justify-content: flex-end;
}

.logo {
  display: flex;
  width: 100%;
  max-height: 75px;
  max-width: 75px;

  & img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
}
</style>
