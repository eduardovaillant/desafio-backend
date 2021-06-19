export class RequiredParamError extends Error {
  constructor (param: string) {
    super(`The param ${param} is required!`)
    this.name = 'RequiredParamError'
  }
}
