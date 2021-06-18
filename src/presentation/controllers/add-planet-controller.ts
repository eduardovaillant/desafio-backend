import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'
import { badRequest, created, serverError } from '../helpers'
import { AddPlanet } from '../../domain/usecases/add-planet'

export class AddPlanetController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPlanet: AddPlanet
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const planetParams = httpRequest.body
      const error = this.validation.validate(planetParams)
      if (error) {
        return badRequest(new Error())
      }
      const planet = await this.addPlanet.add(planetParams)
      return created(planet)
    } catch (error) {
      return serverError(error)
    }
  }
}
