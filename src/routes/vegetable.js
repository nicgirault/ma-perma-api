const express = require('express')

const controller = require('../controllers/vegetable')

const router = express.Router()

/**
 * @swagger
 * /vegetable:
 *   post:
 *     tags:
 *       - "Vegetable"
 *     summary: Create a vegetable
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
 *           properties:
 *             name:
 *               type: string
 *     responses:
 *       "201":
 *         description: The request has been fulfilled and resulted in a new vegetable being created.
 *         application/json: |-
 *           {}
 *       "400":
 *         description: The request is invalid
 */
router.post('/vegetable', controller.create)

module.exports = router
