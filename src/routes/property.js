const express = require('express')
const { check } = require('express-validator/check')

const controller = require('../controllers/property')
const { PROPERTY_TYPES } = require('../config/constants')

const router = express.Router()

/**
 * @swagger
 * /property:
 *   get:
 *     tags:
 *       - "Property"
 *     summary: Get all properties
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: The requested list.
 *         application/json: |-
 *           {}
 */
router.get('/property', controller.get)

/**
 * @swagger
 * /property:
 *   post:
 *     tags:
 *       - "Property"
 *     summary: Create a property
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: The body of the request
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - type
 *           properties:
 *             name:
 *               type: string
 *             type:
 *               type: integer
 *     responses:
 *       "201":
 *         description: The request has been fulfilled and resulted in a new flower being created.
 *         application/json: |-
 *           {}
 *       "400":
 *         description: The request is invalid
 */
router.post('/property', [
  check('name').exists(),
  check('type').exists().isIn(PROPERTY_TYPES)
], controller.create)

module.exports = router
