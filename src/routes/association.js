const express = require('express')
const { check } = require('express-validator/check')

const controller = require('../controllers/association')
const { validateUnicity } = require('../services/association')

const router = express.Router()

/**
 * @swagger
 * /vegetable/{vegetableId}/association:
 *   post:
 *     tags:
 *       - "Association"
 *     summary: Add an association to a vegetable
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
 *             - vegetableIdToAssociate
 *             - isPositive
 *           properties:
 *             vegetableIdToAssociate:
 *               type: integer
 *             isPositive:
 *               type: boolean
 *       - name: vegetableId
 *         description: The vegetable to which the association will be added
 *         in: path
 *         required: true
 *     responses:
 *       "201":
 *         description: The request has been fulfilled and resulted in a new association being created.
 *         application/json: |-
 *           {}
 *       "400":
 *         description: The request is invalid
 */
router.post('/vegetable/:vegetableId/association', [
  check('vegetableId').isInt().exists().custom((value, {req}) => {
    return validateUnicity(value, req.body.vegetableIdToAssociate)
  }),
  check('vegetableIdToAssociate').isInt().exists(),
  check('isPositive').isBoolean().exists()
], controller.post)

/**
 * @swagger
 * /association:
 *   get:
 *     tags:
 *       - "Association"
 *     summary: Get all vegetable associations
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: The list of associations
 *         application/json: |-
 *           {}
 */
router.get('/association', controller.get)

/**
 * @swagger
 * /association/{associationId}:
 *   delete:
 *     tags:
 *       - "Association"
 *     summary: Delete an association
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: associationId
 *         description: The id of the association to delete
 *         in: path
 *         required: true
 *     responses:
 *       "200":
 *         description: The association has been deleted
 *         application/json: |-
 *           {}
 *       "404":
 *         description: The association was not found
 *         application/json: |-
 *           {}
 */
router.delete('/association/:associationId', controller.delete)

module.exports = router
