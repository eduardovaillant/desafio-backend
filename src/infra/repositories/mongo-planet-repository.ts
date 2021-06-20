import { AddPlanetRepository, AddPlanetRepositoryParams, LoadPlanetByIdRepository, LoadPlanetByNameRepository } from '../../data/protocols'
import { PlanetModel } from '../../domain/models'
import { MongoHelper } from '../helpers'

export class MongoPlanetRepository implements AddPlanetRepository, LoadPlanetByNameRepository, LoadPlanetByIdRepository {
  async add (addPlanetRepositoryParams: AddPlanetRepositoryParams): Promise<PlanetModel> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.insertOne(addPlanetRepositoryParams)
    return MongoHelper.map(result.ops[0])
  }

  async loadByName (name: string): Promise<PlanetModel> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.findOne({ name })
    if (result) {
      return MongoHelper.map(result)
    }
    return null
  }

  async loadById (id: string): Promise<PlanetModel> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.findOne({ _id: id })
    if (result) {
      return MongoHelper.map(result)
    }
    return null
  }
}
