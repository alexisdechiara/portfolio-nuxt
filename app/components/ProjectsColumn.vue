<script setup lang="ts">
defineProps<{
  projects: Array<any>;
  even?: boolean;
}>();
</script>

<template>
  <div class="flex flex-col">
    <Motion
      v-for="(project, index) in projects"
      :key="project.title"
      :initial="{ opacity: 0, transform: 'translateY(10px)' }"
      :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
      :transition="{ delay: 0.1 * index }"
      :in-view-options="{ once: true }"
    >
      <UPageCard
        v-if="even ? index % 2 === 0 : index % 2 === 1"
        :description="project.description"
        :to="project.url"
        reverse
        orientation="vertical"
        variant="ghost"
        class="group"
        :ui="{
          wrapper: 'max-sm:order-last',
          title: 'flex items-center justify-between',
        }"
      >
        <template #title>
          {{ project.title }}
          <div class="inline-flex gap-1">
            <UBadge
              v-for="tag in project.tags"
              :key="tag"
              :label="tag"
              color="neutral"
              variant="soft"
              size="sm"
              class="rounded-full"
            />
          </div>
        </template>
        <template #footer>
          <div class="inline-flex gap-1 items-center">
            <NuxtLink
              v-if="project.github"
              :to="project.github"
              class="group/github leading-0 p-1 rounded-full z-50 transition-all text-default hover:scale-125 hover:animate-wiggle"
            >
              <div class="size-4 relative">
                <UIcon
                  name="i-mingcute-github-line"
                  class="absolute inset-0 opacity-100 group-hover/github:opacity-0"
                />
                <UIcon
                  name="i-mingcute-github-fill"
                  class="absolute inset-0 opacity-0 group-hover/github:opacity-100"
                />
              </div>
            </NuxtLink>
            <ULink :to="project.url" class="text-sm text-primary flex items-center">
              Voir le projet
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </ULink>
          </div>
        </template>
        <img
          :src="project.image"
          :alt="project.title"
          class="object-cover w-full h-48 rounded-lg"
        />
      </UPageCard>
    </Motion>
  </div>
</template>
