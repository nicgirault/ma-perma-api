const express = require('express')
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
    tags: [
      {
        name: 'Vegetable',
        description: 'Everything about vegetables'
      },
      {
        name: 'Association',
        description: 'Everything about vegetable associations'
      }
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      Bearer: { type: 'apiKey', name: 'Authorization', in: 'header' }
    }
  },
  apis: [
    path.join(__dirname, 'vegetable.js'),
    path.join(__dirname, 'association.js')
  ]
}

const swaggerSpec = swaggerJSDoc(options)

router.use('/', express.static('./node_modules/swagger-ui-dist'))
router.use('/api-docs', express.static('./node_modules/swagger-ui-dist'))
router.use('/api-docs/specs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  res.send(swaggerSpec)
})

module.exports = router
