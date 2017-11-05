const express = require('express')
const { check } = require('express-validator/check')

const controller = require('../controllers/comment')

const router = express.Router()

/**
 * @swagger
 * /comment:
 *   post:
 *     tags:
 *       - "Comment"
 *     summary: Create a Comment
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
 *             - owner
 *             - text
 *             - varietyId
 *           properties:
 *             owner:
 *               type: string
 *             text:
 *               type: string
 *             varietyId:
 *               type: integer
 *     responses:
 *       "201":
 *         description: The request has been fulfilled and resulted in a new comment being created.
 *         application/json: |-
 *           {}
 *       "400":
 *         description: The request is invalid
 */
router.post('/comment', [
  check('owner').exists(),
  check('text').exists(),
  check('varietyId').exists().isInt()
], controller.create)

module.exports = router
