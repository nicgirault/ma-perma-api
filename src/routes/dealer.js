const express = require('express')
const { check } = require('express-validator/check')

const controller = require('../controllers/dealer')

const router = express.Router()

/**
 * @swagger
 * /dealer:
 *   post:
 *     tags:
 *       - "Dealer"
 *     summary: Create a Dealer for a variety
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
 *             - url
 *             - price
 *             - varietyId
 *           properties:
 *             name:
 *               type: string
 *             url:
 *               type: string
 *             price:
 *               type: string
 *             varietyId:
 *               type: integer
 *     responses:
 *       "201":
 *         description: The request has been fulfilled and resulted in a new dealer being created.
 *         application/json: |-
 *           {}
 *       "400":
 *         description: The request is invalid
 */
router.post('/dealer', [
  check('name').exists(),
  check('url').exists(),
  check('price').exists(),
  check('varietyId').exists().isInt()
], controller.create)

module.exports = router
