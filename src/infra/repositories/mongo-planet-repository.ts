import { AddPlanetRepository, AddPlanetRepositoryParams } from '../../data/protocols'
import { PlanetModel } from '../../domain/models'
import { MongoHelper } from '../helpers'

export class MongoPlanetRepository implements AddPlanetRepository {
  async add (addPlanetRepositoryParams: AddPlanetRepositoryParams): Promise<PlanetModel> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.insertOne(addPlanetRepositoryParams)
    return MongoHelper.map(result.ops[0])
  }
}
