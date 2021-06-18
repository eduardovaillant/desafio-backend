import { Validation } from '../../../src/presentation/protocols'

export class ValidationSpy implements Validation {
  input: any
  result = true

  validate (input: any): any {
    this.input = input
    return this.result
  }
}
