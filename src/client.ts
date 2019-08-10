import { createClient } from 'contentful'
import { BlogEntry } from './interfaces'
import { SPACE_ID, TOKEN } from './env'

const client = createClient({
  space: SPACE_ID,
  accessToken: TOKEN
})

export const fetchEntry = async (entryId: string) => {
  return await client.getEntry<BlogEntry>(entryId)
    .catch(_e => {
      throw new Error('Entry Not Found')
    })
}

export const fetchEntries = async ({ limit = 10, skip = 0 } = {}) => {
  return await client.getEntries<BlogEntry>({
    order: '-sys.createdAt',
    limit,
    skip
  })
}
