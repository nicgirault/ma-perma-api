const express = require('express')
const swaggerUiAssetPath = require('swagger-ui-dist').getAbsoluteFSPath()
const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')

const router = express.Router()

router.get(/^\/?(api-docs)?\/?(index\.html)?$/, (req, res, next) => {
  const protocol = req.get('host').split(':')[0] === 'localhost' ? 'http://' : 'https://'
  const apiSpecPath = protocol + req.get('host') + '/api-docs/specs.json'

  if (req.query.url === apiSpecPath) return next()

  res.redirect(`index.html?url=${apiSpecPath}`)
})

const options = {
  swaggerDefinition: {
    swagger: '2.0',
    info: {
      title: 'Ma Perma API Specs',
      version: '1.0.0'
    },
    schemes: ['http', 'https'],
    securityDefinitions: {
      Bearer: { type: 'apiKey', name: 'Authorization', in: 'header' }
    }
  },
  apis: [
    path.join(__dirname, 'flower.js'),
    path.join(__dirname, 'relation.js'),
    path.join(__dirname, 'property.js')
  ]
}

const swaggerSpec = swaggerJSDoc(options)

router.use('/', express.static(swaggerUiAssetPath))
router.use('/api-docs', express.static(swaggerUiAssetPath))
router.use('/api-docs/specs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

module.exports = router
