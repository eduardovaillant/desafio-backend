import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'

export class AddPlanetController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    return await Promise.resolve(null)
  }
}
