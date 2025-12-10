<script setup lang="ts">
import type { IndexCollectionItem } from "@nuxt/content";

const props = defineProps<{
  page: IndexCollectionItem;
}>();

const items = ref([
  ...new Set(props.page.experiences.items.map((item) => item.tag).filter((t) => t)),
]);
const value = ref(items.value);
</script>

<template>
  <UPageSection
    :title="page.experiences.title"
    :description="page.experiences.description"
    :ui="{
      wrapper: 'flex gap-4 justify-between items-center',
      container: 'px-0 !pt-0 sm:gap-6 lg:gap-8',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted',
      body: 'mt-0',
    }"
  >
    <template #body>
      <USelect
        v-model="value"
        :items="items"
        variant="soft"
        placeholder="Choisissez les types d'expériences"
        multiple
        color="neutral"
        size="lg"
        class="w-48"
      />
    </template>
    <UChangelogVersions
      v-if="value.length"
      :indicator-motion="{ damping: 10, restDelta: 0.001 }"
    >
      <template v-for="(experience, index) in page.experiences.items" :key="index">
        <Motion
          v-show="value.includes(experience.tag)"
          hydrate-on-visible
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
          :transition="{ duration: 0.4, delay: 0.2 * index }"
          :in-view-options="{ once: true }"
        >
          <UChangelogVersion
            :ui="{ container: 'max-w-md' }"
            :badge="experience.tag"
            v-bind="experience"
          >
            <template #title>
              <div class="flex flex-col">
                <div class="flex items-center justify-between w-full">
                  {{ experience.title }}
                  <div class="flex items-center gap-2">
                    <UTooltip
                      v-for="stack in experience.stacks"
                      :key="stack.name"
                      :text="stack.name"
                      :content="{
                        side: 'top',
                      }"
                    >
                      <UIcon
                        v-if="stack.icon"
                        :name="stack.icon"
                        class="hover:scale-110 transition-all size-5 hover:text-(--hover-color)"
                        :style="{ '--hover-color': stack.color }"
                      />
                    </UTooltip>
                  </div>
                </div>
                <div class="inline-flex gap-3">
                  <UButton
                    v-if="experience.links"
                    v-for="link in experience.links"
                    :key="link.label"
                    :label="link.label"
                    :to="link.to"
                    target="_blank"
                    variant="link"
                    color="neutral"
                    size="xs"
                    trailing-icon="i-lucide-external-link"
                    :delay-duration="0"
                    :ui="{
                      base: 'px-0',
                      trailingIcon: 'size-3',
                    }"
                  />
                </div>
              </div>
            </template>
          </UChangelogVersion>
        </Motion>
      </template>
    </UChangelogVersions>
  </UPageSection>
</template>
