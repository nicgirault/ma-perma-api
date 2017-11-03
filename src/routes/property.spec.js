const { expect } = require('chai')
const request = require('supertest')

const app = require('../index')
const { Property } = require('../models')

describe('Property', () => {
  afterEach(() => {
    return Property.destroy({where: {}})
  })

  describe('GET /property', () => {
    it('should return an array of size the number of properties', () => {
      return Property.bulkCreate([
        {
          name: 'Récolte',
          type: 'CALENDAR'
        },
        {
          name: 'Couleur des fleurs',
          type: 'DESCRIPTION'
        }
      ])
      .then(() => {
        return request(app)
        .get('/property')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.length).to.equal(2)
        })
      })
    })
  })

  describe('POST /property', () => {
    it('should return a 201 when posting valid data', () => {
      return request(app)
      .post('/property')
      .send({name: 'Récolte', type: 'CALENDAR'})
      .expect('Content-Type', /json/)
      .expect(201)
    })

    it('should return a 400 when posting already existing property', () => {
      return Property.create({
        name: 'Récolte',
        type: 'CALENDAR'
      })
      .then(() => {
        return request(app)
        .post('/property')
        .send({name: 'Récolte', type: 'CALENDAR'})
        .expect('Content-Type', /json/)
        .expect(400)
      })
    })

    it('should return a 400 if type is unknown', () => {
      return request(app)
      .post('/property')
      .send({name: 'Récolte', type: 'UNKNOWN'})
      .expect('Content-Type', /json/)
      .expect(400)
    })
  })
})
