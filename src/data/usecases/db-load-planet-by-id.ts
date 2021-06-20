import { LoadPlanetByIdRepository } from 'data/protocols'
import { PlanetModel } from 'domain/models'
import { LoadPlanetById } from 'domain/usecases'

export class DbLoadPlanetById implements LoadPlanetById {
  constructor (
    private readonly loadPlanetByIdRepository: LoadPlanetByIdRepository
  ) {}

  async loadById (id: string): Promise<PlanetModel> {
    const planet = await this.loadPlanetByIdRepository.loadById(id)
    return planet
  }
}
