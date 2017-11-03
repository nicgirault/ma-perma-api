const { expect } = require('chai')
const request = require('supertest')

const app = require('../index')
const { Flower } = require('../models')

describe('Flower', () => {
  afterEach(() => {
    return Flower.destroy({where: {}})
  })

  describe('GET /flower', () => {
    it('should return an array of size the number of flowers', () => {
      return Flower.bulkCreate([
        {
          name: 'Aubergine',
          imageUrl: 'https://imgur.com/abcdef',
          type: 'VIVACE'
        },
        {
          name: 'Courgette',
          imageUrl: 'https://imgur.com/abcdef',
          type: 'VIVACE'
        }
      ])
      .then(() => {
        return request(app)
        .get('/flower')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.length).to.equal(2)
        })
      })
    })
  })

  describe('GET /flower/:flowerId', () => {
    it('should return the flower data if the flower id exists', () => {
      return Flower.create({
        name: 'Aubergine',
        imageUrl: 'https://imgur.com/abcdef',
        type: 'VIVACE'
      })
      .then((flower) => {
        return request(app)
        .get(`/flower/${flower.id}`)
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.name).to.equal('Aubergine')
        })
      })
    })

    it('should return a 404 if the flower id does not exist', () => {
      return request(app)
      .get('/flower/1')
      .expect('Content-Type', /json/)
      .expect(404)
    })
  })

  describe('POST /flower', () => {
    it('should return a 201 when posting valid data', () => {
      return request(app)
      .post('/flower')
      .send({name: 'Aubergine', type: 'VIVACE', imageUrl: 'https://imgur.com/abcdef'})
      .expect('Content-Type', /json/)
      .expect(201)
    })

    it('should return a 400 when posting already existing flower', () => {
      return Flower.create({
        name: 'Aubergine',
        imageUrl: 'https://imgur.com/abcdef',
        type: 'VIVACE'
      })
      .then(() => {
        return request(app)
        .post('/flower')
        .send({name: 'Aubergine', type: 'VIVACE', imageUrl: 'https://imgur.com/abcdef'})
        .expect('Content-Type', /json/)
        .expect(400)
      })
    })

    it('should return a 400 if type is unknown', () => {
      return request(app)
      .post('/flower')
      .send({name: 'Aubergine', type: 'UNKNOWN', imageUrl: 'https://imgur.com/abcdef'})
      .expect('Content-Type', /json/)
      .expect(400)
    })
  })
})
