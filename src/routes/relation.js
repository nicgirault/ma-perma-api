const express = require('express')
const { check } = require('express-validator/check')

const controller = require('../controllers/relation')
const { FLOWER_RELATION_TYPES } = require('../config/constants')
const { validateUnicity } = require('../services/relation')

const router = express.Router()

/**
 * @swagger
 * /relation:
 *   post:
 *     tags:
 *       - "Relation"
 *     summary: Add a relation to a flower
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
 *             - flowerAId
 *             - flowerBId
 *             - type
 *           properties:
 *             flowerAId:
 *               type: integer
 *             flowerBId:
 *               type: integer
 *             type:
 *               type: string
 *             description:
 *               type:string
 *     responses:
 *       "201":
 *         description: The request has been fulfilled and resulted in a new relation being created.
 *         application/json: |-
 *           {}
 *       "400":
 *         description: The request is invalid
 */
router.post('/relation', [
  check('flowerAId').isInt().exists().custom((value, {req}) => {
    return validateUnicity(value, req.body.flowerBId)
  }),
  check('flowerBId').isInt().exists(),
  check('type').exists().isIn(FLOWER_RELATION_TYPES)
], controller.post)

/**
 * @swagger
 * /relation:
 *   get:
 *     tags:
 *       - "Relation"
 *     summary: Get all flower relations
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: The list of relations
 *         application/json: |-
 *           {}
 */
router.get('/relation', controller.get)

/**
 * @swagger
 * /relation/{relationId}:
 *   delete:
 *     tags:
 *       - "Relation"
 *     summary: Delete an relation
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: relationId
 *         description: The id of the relation to delete
 *         in: path
 *         required: true
 *     responses:
 *       "200":
 *         description: The relation has been deleted
 *         application/json: |-
 *           {}
 *       "404":
 *         description: The relation was not found
 *         application/json: |-
 *           {}
 */
router.delete('/relation/:relationId', controller.delete)

module.exports = router
