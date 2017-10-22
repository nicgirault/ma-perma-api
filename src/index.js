const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const express = require('express')

const config = require('./config')

const logger = require('./services/logger')

const errorsHandling = require('./middlewares/errors-handling')
const accessLog = require('./middlewares/access-log')
const corsMiddleware = require('./middlewares/cors')

const ApiDocsRouter = require('./routes/api-docs')
const VegetableRouter = require('./routes/vegetable')
const AssociationRouter = require('./routes/association')
const CorsRouter = require('./routes/cors')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(accessLog)
app.use(cookieParser())
app.use(corsMiddleware)

app.use(CorsRouter)
app.use('/', VegetableRouter)
app.use('/', AssociationRouter)
app.use('/', ApiDocsRouter)
app.use(errorsHandling)

app.listen(config.port, function () {
  logger.debug(`App listening on port ${config.port}`)
})

module.exports = app
