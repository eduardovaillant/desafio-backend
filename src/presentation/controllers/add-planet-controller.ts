import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'
import { badRequest, created, serverError, forbidden } from '../helpers'
import { AddPlanet } from '../../domain/usecases'

export class AddPlanetController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPlanet: AddPlanet
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const addPlanetParams = httpRequest.body
      const error = this.validation.validate(addPlanetParams)
      if (error) {
        return badRequest(error)
      }
      const planet = await this.addPlanet.add(addPlanetParams)
      return created(planet)
    } catch (error) {
      console.error(error)
      if (error.name === 'InvalidPlanetDataError' || error.name === 'PlanetAlreadyExistsError') {
        return forbidden(error)
      }
      return serverError(error)
    }
  }
}
