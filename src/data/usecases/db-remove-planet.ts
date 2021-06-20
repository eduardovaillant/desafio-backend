import { RemovePlanetRepository } from 'data/protocols'
import { RemovePlanet } from 'domain/usecases'

export class DbRemovePlanet implements RemovePlanet {
  constructor (
    private readonly removePlanetRepository: RemovePlanetRepository
  ) {}

  async remove (id: string): Promise<boolean> {
    const removed = await this.removePlanetRepository.remove(id)
    return removed
  }
}
