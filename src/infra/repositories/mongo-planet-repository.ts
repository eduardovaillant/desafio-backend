import { AddPlanetRepository, AddPlanetRepositoryParams, LoadPlanetByNameRepository } from '../../data/protocols'
import { PlanetModel } from '../../domain/models'
import { MongoHelper } from '../helpers'

export class MongoPlanetRepository implements AddPlanetRepository, LoadPlanetByNameRepository {
  async add (addPlanetRepositoryParams: AddPlanetRepositoryParams): Promise<PlanetModel> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.insertOne(addPlanetRepositoryParams)
    // TODO testar se realmente retornou algo
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
}
