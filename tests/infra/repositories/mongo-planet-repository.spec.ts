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
})
