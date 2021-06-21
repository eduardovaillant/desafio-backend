import { CheckPlanetByNameRepository } from '../protocols'
import { CheckPlanetByName } from '../../domain/usecases'

export class DbCheckPlanetByName implements CheckPlanetByName {
  constructor (
    private readonly checkPlanetByNameRepository: CheckPlanetByNameRepository
  ) {}

  async checkByName (name: string): Promise<boolean> {
    const exists = await this.checkPlanetByNameRepository.checkByName(name.toLowerCase())
    return exists
  }
}
