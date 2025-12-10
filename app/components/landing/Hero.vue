<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

const { footer, global } = useAppConfig();

defineProps<{
  page: IndexCollectionItem;
}>();
</script>

<template>
  <UPageHero
    :ui="{
      headline: 'flex items-center justify-center',
      title: 'text-shadow-md max-w-lg mx-auto',
      links: 'mt-4 flex-col justify-center items-center',
    }"
  >
    <template #headline>
      <Motion
 :initial="{ scale: 1.1, opacity: 0, filter: 'blur(20px)' }"
        :animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }" :transition="{ duration: 0.4, delay: 0.1 }"
      >
        <UColorModeAvatar
          class="size-32 ring ring-default ring-offset-3 ring-offset-bg"
          :light="global.picture?.light!"
          :dark="global.picture?.dark!"
          :alt="global.picture?.alt!"
        />
      </Motion>
    </template>

    <template #title>
      <Motion
 :initial="{ scale: 1.1, opacity: 0, filter: 'blur(20px)' }"
        :animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }" :transition="{ duration: 0.4, delay: 0.1 }"
      >
        {{ page.title }}
      </Motion>
    </template>

    <template #description>
      <Motion
 :initial="{ scale: 1.1, opacity: 0, filter: 'blur(20px)' }"
        :animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }" :transition="{ duration: 0.4, delay: 0.3 }"
      >
        <MDC :value="page.description" unwrap="p" />
      </Motion>
    </template>

    <template #links>
      <Motion
 :initial="{ scale: 1.1, opacity: 0, filter: 'blur(20px)' }"
        :animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }" :transition="{ duration: 0.4, delay: 0.5 }"
      >
        <div v-if="page.hero.links" class="flex items-center gap-2">
          <UButton v-for="(link, index) of page.hero.links" :key="index" v-bind="link" />
        </div>
      </Motion>

      <div class="gap-x-4 inline-flex mt-4">
        <Motion
          v-for="(link, index) of footer?.links"
          :key="index"
          :initial="{ scale: 1.1, opacity: 0, filter: 'blur(20px)' }"
          :animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }"
          :transition="{ duration: 0.4, delay: 0.5 + index * 0.1 }"
        >
          <UButton v-bind="{ size: 'md', color: 'neutral', variant: 'ghost', ...link }" />
        </Motion>
      </div>
    </template>

    <UMarquee
      v-for="(marquee, marqueesIndex) in page.marquees"
      :key="marqueesIndex"
      :reverse="marqueesIndex % 2 !== 0"
      pause-on-hover
      class="-my-10 py-0.5 [--duration:60s] [--gap:--spacing(4)]"
    >
      <Motion
        v-for="(stack, index) in marquee.stacks"
        :key="index"
        :initial="{ scale: 1.1, opacity: 0, filter: 'blur(20px)' }"
        :animate="{ scale: 1, opacity: 1, filter: 'blur(0px)' }" :transition="{ duration: 0.4, delay: index * 0.25 }"
      >
        <UPageCard
          v-bind="stack"
          :ui="{
            container: 'gap-x-4 gap-y-2 p-2 sm:p-4',
            wrapper: 'max-w-3xs',
            leading: 'mb-1.75',
            title: 'text-sm',
            description: 'text-xs',
          }"
        >
          <template #leading>
            <UIcon
              :name="stack.icon"
              class="size-4 shrink-0"
              :style="{ color: stack.color }"
            />
          </template>
        </UPageCard>
      </Motion>
    </UMarquee>
  </UPageHero>
</template>
