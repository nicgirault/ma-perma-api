const express = require('express')
const { check } = require('express-validator/check')

const controller = require('../controllers/vegetable')

const router = express.Router()

/**
 * @swagger
 * /vegetable:
 *   get:
 *     tags:
 *       - "Vegetable"
 *     summary: Get all vegetables
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: The requested list.
 *         application/json: |-
 *           {}
 */
router.get('/vegetable', controller.get)

/**
 * @swagger
 * /vegetable/{vegetableId}:
 *   get:
 *     tags:
 *       - "Vegetable"
 *     summary: Get a vegetable by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: vegetableId
 *         description: The id of the vegetable to get
 *         in: path
 *         required: true
 *     responses:
 *       "200":
 *         description: The requested vegetable.
 *         application/json: |-
 *           {}
 */
router.get('/vegetable/:vegetableId', controller.getById)

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
  check('imageUrl').exists(),
  check('categoryId').exists().isInt()
], controller.create)

/**
 * @swagger
 * /vegetable/category:
 *   get:
 *     tags:
 *       - "Vegetable"
 *     summary: Get all vegetable categories
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: The requested list.
 *         application/json: |-
 *           {}
 */
router.get('/vegetable/category', controller.getCategories)

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
 *             - name
 *           properties:
 *             name:
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
  check('name').exists()
], controller.createCategory)

module.exports = router
