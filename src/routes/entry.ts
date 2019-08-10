import { app } from '../app'
import { fetchEntry } from '../client'

app.get('/entries/:id', async (req, res) => {
  const entryId = req.params.id
  const entry = await fetchEntry(entryId)
    .catch(e => {
      res.status(404)
      res.send({ message: e.message })
      return
    })
  res.send(entry)
})

export default app
