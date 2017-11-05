const express = require('express')
const { check } = require('express-validator/check')

const controller = require('../controllers/variety')

const router = express.Router()

/**
 * @swagger
 * /variety/{varietyId}:
 *   get:
 *     tags:
 *       - "Variety"
 *     summary: Get a variety by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: varietyId
 *         description: The id of the variety to get
 *         in: path
 *         required: true
 *     responses:
 *       "200":
 *         description: The requested variety.
 *         application/json: |-
 *           {}
 *       "404":
 *         description: The requested variety does not exist.
 *         application/json: |-
 *           {}
 */
router.get('/variety/:varietyId', controller.getById)

/**
 * @swagger
 * /variety:
 *   post:
 *     tags:
 *       - "Variety"
 *     summary: Create a Variety
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
 *             - flowerId
 *             - name
 *           properties:
 *             name:
 *               type: string
 *             imageUrl:
 *               type: string
 *             flowerId:
 *               type: integer
 *     responses:
 *       "201":
 *         description: The request has been fulfilled and resulted in a new variety being created.
 *         application/json: |-
 *           {}
 *       "400":
 *         description: The request is invalid
 */
router.post('/variety', [
  check('name').exists(),
  check('imageUrl').exists().isURL(),
  check('flowerId').exists().isInt()
], controller.create)

module.exports = router
