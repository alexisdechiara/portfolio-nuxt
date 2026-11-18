import { parseStringPromise } from 'xml2js'
import { ofetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = typeof query.url === 'string' ? query.url : null

  if (!url) {
    throw createError({ statusCode: 400, statusMessage: 'Missing RSS URL' })
  }

  // Désactiver le cache côté client
  setHeader(event, 'Cache-Control', 'no-cache, no-store, must-revalidate')
  setHeader(event, 'Pragma', 'no-cache')
  setHeader(event, 'Expires', '0')

  const xml = await ofetch(url, {
    responseType: 'text',
    timeout: 8000,
    headers: {
      'User-Agent': 'alexisdechiara.fr RSS Reader (+https://alexisdechiara.fr)'
    }
  })
  const json = await parseStringPromise(xml)

  return json
})
