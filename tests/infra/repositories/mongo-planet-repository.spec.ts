import { MongoHelper } from '../../../src/infra/helpers'
import { MongoPlanetRepository } from '../../../src/infra/repositories'
import { mockAddPlanetRepositoryParams } from '../../data/mocks/repositories'

import { Collection } from 'mongodb'

let planetCollection: Collection

const makeSut = (): MongoPlanetRepository => {
  return new MongoPlanetRepository()
}

describe('MongoPlanetRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    planetCollection = await MongoHelper.getCollection('planets')
    await planetCollection.deleteMany({})
  })

  describe('add()', () => {
    test('should return the created planet on success ', async () => {
      const sut = makeSut()
      const addPlanetRepositoryParams = mockAddPlanetRepositoryParams()
      const planet = await sut.add(addPlanetRepositoryParams)
      expect(planet.id).toBeTruthy()
      expect(planet.name).toBe('any_name')
    })
  })

  describe('loadByName()', () => {
    test('should return the planet if the planet exists in the database', async () => {
      await planetCollection.insertOne(mockAddPlanetRepositoryParams())
      const sut = makeSut()
      const planet = await sut.loadByName('any_name')
      expect(planet.id).toBeTruthy()
      expect(planet.name).toBe('any_name')
    })

    test('should return null if the planet does not exists in the database', async () => {
      const sut = makeSut()
      const planet = await sut.loadByName('any_name')
      expect(planet).toBeNull()
    })
  })
})
