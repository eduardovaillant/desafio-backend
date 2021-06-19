import { LoadPlanetByName } from '../../domain/usecases'
import { ok, serverError } from '../helpers'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class LoadPlanetByNameController implements Controller {
  constructor (
    private readonly loadPlanetByName: LoadPlanetByName
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // TODO validate the name?
      const name = httpRequest.query.name
      const planet = await this.loadPlanetByName.loadByName(name)
      return ok(planet)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
