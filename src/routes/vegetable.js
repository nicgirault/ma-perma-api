const express = require('express')
const { check } = require('express-validator/check')

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
 *             - categoryId
 *           properties:
 *             name:
 *               type: string
 *             categoryId:
 *               type: integer
 *     responses:
 *       "201":
 *         description: The request has been fulfilled and resulted in a new vegetable being created.
 *         application/json: |-
 *           {}
 *       "400":
 *         description: The request is invalid
 */
router.post('/vegetable', [
  check('name').exists(),
  check('categoryId').exists().isInt()
], controller.create)

/**
 * @swagger
 * /vegetable/category:
 *   post:
 *     tags:
 *       - "Vegetable"
 *     summary: Create a vegetable category
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
 *             - label
 *           properties:
 *             label:
 *               type: string
 *     responses:
 *       "201":
 *         description: The request has been fulfilled and resulted in a new vegetable category being created.
 *         application/json: |-
 *           {}
 *       "400":
 *         description: The request is invalid
 */
router.post('/vegetable/category', [
  check('label').exists()
], controller.createCategory)

module.exports = router
