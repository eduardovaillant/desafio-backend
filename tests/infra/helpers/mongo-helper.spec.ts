
import { MongoHelper as sut } from '../../../src/infra/helpers'

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL || 'mongodb://mongo:27017/b2w')
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should reconnect if mongodb is down', async () => {
    let accountCollection = await sut.getCollection('planets')
    expect(accountCollection).toBeTruthy()
    await sut.disconnect()
    accountCollection = await sut.getCollection('planets')
    expect(accountCollection).toBeTruthy()
  })
})
