<script setup lang="ts">
const { data: page } = await useAsyncData("blog-page", () => {
  return queryCollection("pages").path("/blog").first();
});
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

const { data, posts, pending } = await useRss("https://geekly.blog/rss");

if (!pending.value && !data.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "blogs posts not found",
    fatal: true,
  });
}

useSeoMeta({
  title: page.value?.seo?.title || page.value?.title,
  ogTitle: page.value?.seo?.title || page.value?.title,
  description: page.value?.seo?.description || page.value?.description,
  ogDescription: page.value?.seo?.description || page.value?.description,
});
</script>

<template>
  <UPage v-if="page">
    <UPageHero :title="page.title" :description="page.description" :links="page.links" :ui="{
      title: '!mx-0 text-left',
      description: '!mx-0 text-left',
  links: 'justify-start',
}" />
    <UPageSection :ui="{ container: '!pt-0' }">
      <UBlogPosts orientation="vertical">
        <Motion v-for="(post, index) in posts.slice(0, 5)" :key="index"
          :initial="{ opacity: 0, transform: 'translateY(10px)' }"
          :while-in-view="{ opacity: 1, transform: 'translateY(0)' }" :transition="{ delay: 0.2 * index }"
          :in-view-options="{ once: true }">
          <UBlogPost variant="naked" orientation="horizontal" :description="post.description[0]" :date="post.pubDate[0]"
            :to="post.link[0]" :title="post.title[0]" :image="post['media:content'][0].$.url"
            :ui="{
              root: 'md:grid md:grid-cols-2 group overflow-visible transition-all duration-300',
  image: 'group-hover/blog-post:scale-105 rounded-lg shadow-lg border-4 border-muted ring-2 ring-default',
  header: index % 2 === 0 ? 'sm:-rotate-1 overflow-visible' : 'sm:rotate-1 overflow-visible'
}">
          </UBlogPost>
        </Motion>
      </UBlogPosts>
    </UPageSection>
  </UPage>
</template>
