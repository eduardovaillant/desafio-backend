import { mockSwapiPlanetReturn } from '../../data/mocks/swapi-client'
import { SwapiClientImpl } from '../../../src/infra/clients/swapi-client'

import axios from 'axios'

jest.mock('axios', () => ({
  async get (): Promise<any> {
    return Promise.resolve({ data: mockSwapiPlanetReturn() })
  }
}))

type SutTypes = {
  sut: SwapiClientImpl
}

const makeSut = (): SutTypes => {
  const sut = new SwapiClientImpl()
  return {
    sut
  }
}

describe('SwapiClient', () => {
  test('should call the swapi with correct values', async () => {
    const { sut } = makeSut()
    const url = 'https://swapi.dev/api/planets/?search=any_name'
    const getSpy = jest.spyOn(axios, 'get')
    await sut.search('any_name')
    expect(getSpy).toHaveBeenCalledWith(url)
  })
})
