import { RemovePlanet } from '../../../src/domain/usecases'

export class RemovePlanetSpy implements RemovePlanet {
  id: string
  removed: boolean = true

  async remove (id: string): Promise<boolean> {
    this.id = id
    return this.removed
  }
}
