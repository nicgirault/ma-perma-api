const express = require('express')
const { check } = require('express-validator/check')

const { FLOWER_TYPES } = require('../config/constants')
const controller = require('../controllers/flower')

const router = express.Router()

/**
 * @swagger
 * /flower:
 *   get:
 *     tags:
 *       - "Flower"
 *     summary: Get all flowers
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: The requested list.
 *         application/json: |-
 *           {}
 */
router.get('/flower', controller.get)

/**
 * @swagger
 * /flower/{flowerId}:
 *   get:
 *     tags:
 *       - "Flower"
 *     summary: Get a flower by id
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: flowerId
 *         description: The id of the flower to get
 *         in: path
 *         required: true
 *     responses:
 *       "200":
 *         description: The requested flower.
 *         application/json: |-
 *           {}
 *       "404":
 *         description: The requested flower does not exist.
 *         application/json: |-
 *           {}
 */
router.get('/flower/:flowerId', controller.getById)

/**
 * @swagger
 * /flower/{flowerId}:
 *   delete:
 *     tags:
 *       - "Flower"
 *     summary: Delete a flower
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: flowerId
 *         description: The id of the flower to get
 *         in: path
 *         required: true
 *     responses:
 *       "200":
 *         description: The flower was deleted.
 *         application/json: |-
 *           {}
 *       "404":
 *         description: The requested flower does not exist.
 *         application/json: |-
 *           {}
 */
router.delete('/flower/:flowerId', controller.delete)

/**
 * @swagger
 * /flower:
 *   post:
 *     tags:
 *       - "Flower"
 *     summary: Create a flower
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
 *               type: string
 *     responses:
 *       "201":
 *         description: The request has been fulfilled and resulted in a new flower being created.
 *         application/json: |-
 *           {}
 *       "400":
 *         description: The request is invalid
 */
router.post('/flower', [
  check('name').exists(),
  check('imageUrl').exists().isURL(),
  check('type').exists().isIn(FLOWER_TYPES)
], controller.create)

/**
 * @swagger
 * /flower/{flowerId}/property:
 *   post:
 *     tags:
 *       - "Flower"
 *     summary: Create a flower property
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
 *             - value
 *             - propertyId
 *           properties:
 *             value:
 *               type: string
 *             propertyId:
 *               type: integer
 *       - name: flowerId
 *         description: The flowerId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       "201":
 *         description: The request has been fulfilled and resulted in a new flower being created.
 *         application/json: |-
 *           {}
 *       "400":
 *         description: The request is invalid
 */
router.post('/flower/:flowerId/property', [
  check('value').exists(),
  check('propertyId').exists().isInt(),
  check('flowerId').exists().isInt()
], controller.addProperty)

module.exports = router
