<script setup lang="ts">
const props = defineProps<{
  icon: string;
  hoveredIcon?: string;
  to: string;
  label: string;
  class?: string;
}>();

const hasHoverEffect = computed(() => props.hoveredIcon !== undefined);
</script>

<template>
  <UTooltip :text="label" :delay-duration="200" :content="{ side: 'top', sideOffset: 4 }">
    <NuxtLink
      :to="to"
      :aria-label="label"
      class="leading-0 p-1 rounded-full z-50 transition-all text-default"
      target="_blank"
      :class="class"
    >
      <div class="size-4 relative group/icon hover:scale-125 hover:animate-wiggle">
        <UIcon
          :name="icon"
          class="absolute inset-0 transition-opacity duration-200"
          :class="{
            'opacity-100 group-hover/icon:opacity-0': hasHoverEffect,
            'opacity-100': !hasHoverEffect,
          }"
        />
        <UIcon
          v-if="hasHoverEffect"
          :name="hoveredIcon || icon"
          class="absolute inset-0 opacity-0 transition-opacity duration-200 group-hover/icon:opacity-100"
        />
      </div>
    </NuxtLink>
  </UTooltip>
</template>
