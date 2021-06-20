import { ListPlanetsRepository } from '../protocols'
import { PlanetModel } from '../../domain/models'
import { ListPlanets } from '../../domain/usecases'

export class DbListPlanets implements ListPlanets {
  constructor (
    private readonly listPlanetsRepository: ListPlanetsRepository
  ) {}

  async list (): Promise<PlanetModel[]> {
    const planets = await this.listPlanetsRepository.list()
    return planets
  }
}
