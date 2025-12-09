import { parseStringPromise } from 'xml2js'
import { ofetch } from 'ofetch'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = typeof query.url === 'string' ? query.url : null

  if (!url) {
    throw createError({ statusCode: 400, statusMessage: 'Missing RSS URL' })
  }

  const xml = await ofetch(url, { responseType: 'text' })
  const json = await parseStringPromise(xml)

  return json
})
