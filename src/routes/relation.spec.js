const { expect } = require('chai')
const request = require('supertest')

const app = require('../index')
const { Relation, Flower } = require('../models')

describe('Relation', function () {
  before(function () {
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
      },
      {
        name: 'Tomate',
        imageUrl: 'https://imgur.com/abcdef',
        type: 'VIVACE'
      }
    ], {returning: true})
    .then((flowers) => {
      this.flowers = flowers
    })
  })
  after(() => {
    return Flower.destroy({where: {}})
  })

  afterEach(() => {
    return Relation.destroy({where: {}})
  })

  describe('GET /relation', function () {
    it('should return an array of size the number of relations', function () {
      return Relation.bulkCreate([
        {
          flowerAId: this.flowers[0].id,
          flowerBId: this.flowers[1].id,
          type: 'ASSOCIATE_WITH'
        },
        {
          flowerAId: this.flowers[0].id,
          flowerBId: this.flowers[2].id,
          type: 'ASSOCIATE_WITH'
        }
      ])
      .then(() => {
        return request(app)
        .get('/relation')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(response => {
          expect(response.body.length).to.equal(2)
        })
      })
    })
  })

  describe('POST /relation', () => {
    it('should return a 201 when posting valid data', function () {
      return request(app)
      .post('/relation')
      .send({
        flowerAId: this.flowers[0].id,
        flowerBId: this.flowers[1].id,
        type: 'ASSOCIATE_WITH'
      })
      .expect('Content-Type', /json/)
      .expect(201)
    })

    it('should return a 400 when posting already existing relation', function () {
      return Relation.create({
        flowerAId: this.flowers[0].id,
        flowerBId: this.flowers[1].id,
        type: 'ASSOCIATE_WITH'
      })
      .then(() => {
        return request(app)
        .post('/relation')
        .send({
          flowerAId: this.flowers[0].id,
          flowerBId: this.flowers[1].id,
          type: 'ASSOCIATE_WITH'
        })
        .expect('Content-Type', /json/)
        .expect(400)
      })
    })

    it('should consider mirror relation as identical', function () {
      return Relation.create({
        flowerAId: this.flowers[0].id,
        flowerBId: this.flowers[1].id,
        type: 'ASSOCIATE_WITH'
      })
      .then(() => {
        return request(app)
        .post('/relation')
        .send({
          flowerAId: this.flowers[1].id,
          flowerBId: this.flowers[0].id,
          type: 'ASSOCIATE_WITH'
        })
        .expect('Content-Type', /json/)
        .expect(400)
      })
    })

    it('should return a 400 if type is unknown', function () {
      return request(app)
      .post('/relation')
      .send({
        flowerAId: this.flowers[1].id,
        flowerBId: this.flowers[0].id,
        type: 'UNKNOWN'
      })
      .expect('Content-Type', /json/)
      .expect(400)
    })
  })
})
