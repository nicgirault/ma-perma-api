const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')

const config = require('./config')

const logger = require('./services/logger')

const errorsHandling = require('./middlewares/errors-handling')
const accessLog = require('./middlewares/access-log')
const corsMiddleware = require('./middlewares/cors')

const ApiDocsRouter = require('./routes/api-docs')
const FlowerRouter = require('./routes/flower')
const RelationRouter = require('./routes/relation')
const PropertyRouter = require('./routes/property')
const CorsRouter = require('./routes/cors')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(accessLog)
app.use(cookieParser())
app.use(corsMiddleware)

app.use(CorsRouter)
app.use('/', FlowerRouter)
app.use('/', RelationRouter)
app.use('/', PropertyRouter)
app.use('/', ApiDocsRouter)
app.use(errorsHandling)

app.listen(config.port, function () {
  logger.debug(`App listening on port ${config.port}`)
})

module.exports = app
