import type { SelectItem } from '@nuxt/ui'

export const useProjectFilters = (projects: Ref<any[] | null | undefined>) => {
  const search = ref('')
  const selectedFilters = ref<SelectItem[]>([])
  const items = ref<SelectItem[]>([])

  // Helper pour le formatage en Title Case
  const toTitleCase = (str: string) => {
    return str.replace(
      /\w\S*/g,
      txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  }

  const filters = computed({
    get: (): SelectItem[] => selectedFilters.value,
    set: (newFilters: SelectItem[]) => {
      const types = ['project', 'demo']
      const access = ['disponible', 'indisponible']
      const reserved = [...types, ...access]

      const hasType = newFilters.some((i: any) => types.includes(i.value))
      const hasAccess = newFilters.some((i: any) => access.includes(i.value))
      const hasCategory = newFilters.some(
        (i: any) => !reserved.includes(i.value)
      )

      if (hasType && hasAccess && hasCategory) {
        selectedFilters.value = newFilters
      } else {
        // Force reactivity to reset UI if invalid
        selectedFilters.value = selectedFilters.value.slice()
      }
    }
  })

  // Générer dynamiquement les filtres à partir des projets
  const generateFilterItems = (projectsList: any[]) => {
    if (!projectsList || projectsList.length === 0) return []

    // Vérifier si les projets sont chargés
    if (!Array.isArray(projectsList)) return []

    // Récupérer les tags uniques de tous les projets
    const allTags = projectsList.flatMap(p => p.tags || [])
    const uniqueTags = [...new Set(allTags)].sort()

    // Créer les options de filtre
    const filterOptions: SelectItem[] = [
      // Filtres par type
      {
        type: 'label',
        label: 'Type'
      },
      {
        label: 'Projet',
        value: 'project'
      },
      {
        label: 'Démo',
        value: 'demo'
      },
      {
        type: 'separator'
      },
      // Filtres par accès
      {
        type: 'label',
        label: 'Accès'
      },
      {
        label: 'Disponible',
        value: 'disponible',
        chip: {
          color: 'success'
        }
      },
      {
        label: 'Indisponible',
        value: 'indisponible',
        chip: {
          color: 'error'
        }
      },
      {
        type: 'separator'
      },
      // Filtres par tag
      {
        type: 'label',
        label: 'Catégories'
      },
      ...uniqueTags.map(tag => ({
        label: toTitleCase(tag),
        value: tag
      }))
    ]

    return filterOptions
  }

  // Initialiser les filtres une fois les projets chargés
  watch(
    projects,
    (newProjects) => {
      if (newProjects && newProjects.length) {
        const generatedItems = generateFilterItems(newProjects)
        items.value = generatedItems
        // Sélectionner tout par défaut
        selectedFilters.value = generatedItems.filter(
          i => typeof i === 'object' && i !== null && 'value' in i
        )
      }
    },
    { immediate: true }
  )

  const isProjectVisible = (project: any) => {
    const matchesSearch = !search.value || project.title.toLowerCase().includes(search.value.toLowerCase()) || project.description.toLowerCase().includes(search.value.toLowerCase())

    if (!matchesSearch) return false

    if (selectedFilters.value.length === 0) return false

    // Extraire les valeurs des filtres sélectionnés
    const selectedValues = selectedFilters.value.map((f: any) => f.value)

    const projectTags = project.tags || []
    const projectType = project.type || 'project'
    const reserved = ['disponible', 'indisponible', 'project', 'demo']

    const hasTypeFilter = selectedValues.some(val => ['project', 'demo'].includes(val))
    const hasAvailabilityFilter = selectedValues.some(val => ['disponible', 'indisponible'].includes(val))
    const hasTagFilter = selectedValues.some(val => !reserved.includes(val))

    const matchesType = selectedValues.includes(projectType)
    const matchesAvailable = (selectedValues.includes('disponible') && project.available) || (selectedValues.includes('indisponible') && !project.available)
    const matchesTag = selectedValues.some(val => !reserved.includes(val) && projectTags.includes(val))

    if (hasTypeFilter && !matchesType) return false
    if (hasAvailabilityFilter && !matchesAvailable) return false
    if (hasTagFilter && !matchesTag) return false

    return true
  }

  const hasVisibleProjects = computed(() => {
    return projects.value?.some(isProjectVisible) || false
  })

  return {
    search,
    filters,
    items,
    isProjectVisible,
    hasVisibleProjects
  }
}
