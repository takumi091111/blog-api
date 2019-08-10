import { app } from '../app'
import { fetchEntries } from '../client'

app.get('/entries/list', async (req, res) => {
  const entries = await fetchEntries({
    limit: req.query.limit,
    skip: req.query.skip
  })
  res.send(entries)
})

export default app
