<script setup lang="ts">
import { Analytics } from "@vercel/analytics/nuxt";
const colorMode = useColorMode();

const color = computed(() => (colorMode.value === "dark" ? "#020618" : "white"));

useHead({
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
    { key: "theme-color", name: "theme-color", content: color },
    { name: "robots", content: "noimageindex" },
  ],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "fr",
  },
});

useSeoMeta({
  titleTemplate: "%s - Portfolio",
  ogImage: "/img/portfolio-v3.webp",
  twitterImage: "/img/portfolio-v3.webp",
  twitterCard: "summary_large_image",
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
    <Analytics />
  </UApp>
</template>
