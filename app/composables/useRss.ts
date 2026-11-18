export async function useRss(url: string) {
  const { data, pending, error } = await useFetch('/api/rss', {
    params: { url },
    transform: (data) => {
      return data.rss.channel[0]
    },
    key: `rss-${url}`,
    // Récupéré côté navigateur : le build/prérendu ne dépend pas de la disponibilité du flux
    server: false,
    default: () => null
  })

  const posts = computed(() => {
    return data.value?.item || []
  })

  return { data, pending, error, posts }
}
