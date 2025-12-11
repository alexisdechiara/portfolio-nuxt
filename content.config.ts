import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  target: z.enum(['_blank', '_self']).optional()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: 'index.yml',
      schema: z.object({
        hero: z.object({
          links: z.array(createButtonSchema()),
          images: z.array(createImageSchema())
        }),
        marquees: z.array(z.object({
          stacks: z.array(z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string().editor({ input: 'icon' }),
            color: z.string()
          }))
        })),
        about: createBaseSchema(),
        experience: createBaseSchema().extend({
          items: z.array(z.object({
            date: z.date(),
            position: z.string(),
            company: z.object({
              name: z.string(),
              url: z.string(),
              logo: z.string().editor({ input: 'icon' }),
              color: z.string()
            })
          }))
        }),
        blog: createBaseSchema(),
        projects: createBaseSchema(),
        experiences: createBaseSchema().extend({
          items: z.array(z.object({
            date: z.date() || z.string(),
            tag: z.enum(['Études', 'Alternance', 'Stage', 'CDI', 'CDD', 'Freelance']) || z.string(),
            title: z.string(),
            description: z.string(),
            stacks: z.array(z.object({
              name: z.string(),
              icon: z.string().editor({ input: 'icon' }),
              color: z.string()
            })),
            links: z.array(createButtonSchema()).optional()
          }))
        })
      })
    }),
    projects: defineCollection({
      type: 'data',
      source: 'projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().nonempty().editor({ input: 'media' }),
        github: z.string().nonempty().optional(),
        figma: z.string().nonempty().optional(),
        url: z.string().nonempty(),
        stacks: z.array(z.string()),
        tags: z.array(z.string()),
        type: z.enum(['project', 'demo']).default('project'),
        date: z.date(),
        featured: z.boolean().default(false).optional(),
        available: z.boolean().default(false).optional()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: 'projects.yml' },
        { include: 'blog.yml' }
      ],
      schema: z.object({
        links: z.array(createButtonSchema())
      })
    }),
    about: defineCollection({
      type: 'page',
      source: 'about.yml',
      schema: z.object({
        content: z.object({}),
        images: z.array(createImageSchema())
      })
    })
  }
})
