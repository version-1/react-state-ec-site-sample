const express = require('express')
const app = express()
const port = 8080
const bodyParser = require('body-parser')

app.use(express.json())
app.use(bodyParser.json({ type: 'application/*+json' }))

app.get('/api/v1/', (req, res) => {
  res.status(200).json({ message: 'ok' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

