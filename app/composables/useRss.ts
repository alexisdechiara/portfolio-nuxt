export async function useRss(url: string) {
  const { data, pending, error } = await useFetch('/api/rss', {
    params: { url },
    transform: (data) => {
      return data.rss.channel[0]
    }
  })

  const posts = computed(() => {
    return data.value.item
  })

  return { data, pending, error, posts }
}
