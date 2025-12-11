<script setup lang="ts">
const { data: page } = await useAsyncData("projects-page", () => {
  return queryCollection("pages").path("/projects").first();
});

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data: projects } = await useAsyncData(
  `projects-${Date.now()}`,
  () => {
    return queryCollection("projects").order("date", "DESC").all();
  },
  {
    getCachedData(key: string): undefined {
      return undefined; // Désactive le cache pour forcer un rafraîchissement
    },
  }
);

const {
  search,
  filters,
  items,
  isProjectVisible,
  hasVisibleProjects,
} = useProjectFilters(projects);

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: '!mx-0 text-left',
        description: '!mx-0 text-left',
        links: 'justify-start',
      }"
    >
      <template #description>
        <MDC :value="page.description" unwrap="p" />
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: '!pt-0',
      }"
    >
      <UInput
        v-model="search"
        variant="subtle"
        placeholder="Rechercher un projet…"
        color="neutral"
        :ui="{
          root: 'max-w-xs w-full mx-auto',
          base: 'rounded-full',
          trailing: 'pe-0.5',
        }"
      >
        <template #trailing>
          <USelectMenu
            v-model="filters"
            :items="items"
            multiple
            variant="none"
            trailing-icon="i-lucide-settings-2"
            arrow
            :content="{
              align: 'center',
              side: 'bottom',
              sideOffset: 16,
            }"
            :ui="{
              value: 'hidden',
              content: 'min-w-48 max-h-80',
              trailingIcon: 'cursor-pointer',
            }"
          />
        </template>
      </UInput>
      <UPageGrid v-if="hasVisibleProjects" class="lg:grid-cols-2 2xl:grid-cols-3">
        <UPageCard
          v-for="project in projects"
          v-show="isProjectVisible(project)"
          :key="project.title"
          :description="project.description"
          :to="project.url || project.figma || project.github"
          target="_blank"
          orientation="vertical"
          variant="soft"
          class="group"
          :ui="{
            root: 'size-full',
            wrapper: 'max-sm:order-last order-last',
            container: 'lg:flex gap-x-0',
            title: 'flex items-center justify-between mb-auto',
          }"
        >
          <template #title>
            <div class="inline-flex items-center gap-1">
              <span class="w-full truncate">
                {{ project.title }}
              </span>
              <UTooltip
                :text="`Site web ${project.available ? 'disponible' : 'non disponible'}`"
                :content="{ side: 'top' }"
                :delay-duration="0"
              >
                <UButton
                  :color="project.available ? 'success' : 'error'"
                  variant="link"
                  class="gap-2 z-50 cursor-pointer"
                >
                  <template #leading>
                    <span class="relative flex size-2">
                      <span
                        class="absolute inline-flex size-full rounded-full opacity-75"
                        :class="
                          project.available ? 'bg-success animate-ping' : 'bg-error'
                        "
                      />
                      <span
                        class="relative inline-flex size-2 scale-90 rounded-full"
                        :class="project.available ? 'bg-success' : 'bg-error'"
                      />
                    </span>
                  </template>
                </UButton>
              </UTooltip>
            </div>
            <div class="inline-flex gap-1">
              <UBadge
                v-for="tag in project.stacks"
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
              <div class="inline-flex items-center -space-x-1">
                <HoverIcon
                  v-if="project.github"
                  icon="i-mingcute-github-line"
                  hovered-icon="i-mingcute-github-fill"
                  :to="project.github"
                  label="Voir sur GitHub"
                />
                <HoverIcon
                  v-if="project.figma"
                  icon="i-basil-figma-outline"
                  hovered-icon="i-basil-figma-solid"
                  :to="project.figma"
                  label="Voir sur Figma"
                />
              </div>
              <ULink
                :to="project.url"
                class="text-sm text-primary flex items-center"
                target="_blank"
              >
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
      </UPageGrid>

      <div v-else-if="!projects" class="w-full flex justify-center items-center py-12">
        <div class="text-center">
          <UIcon
            name="i-lucide-loader-2"
            class="animate-spin h-8 w-8 mx-auto text-primary-500"
          />
          <p class="mt-2 text-sm text-gray-500">Chargement des projets...</p>
        </div>
      </div>

      <div v-else class="w-full text-center py-12">
        <p class="text-gray-500">Aucun projet ne correspond aux critères de recherche</p>
      </div>
    </UPageSection>
  </UPage>
</template>
