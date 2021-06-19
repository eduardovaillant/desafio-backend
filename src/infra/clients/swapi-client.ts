import { SwapiClient, SwapiPlanetReturn } from '../../data/protocols/swapi-client'
import axios from 'axios'

// TODO unit and integration tests
export class SwapiClientImpl implements SwapiClient {
  async search (name: string): Promise<SwapiPlanetReturn> {
    const url = `https://swapi.dev/api/planets/?search=${name}`

    const response = await axios.get(url)

    const swapiPlanetReturn: SwapiPlanetReturn = {
      name: response.data.results[0].name,
      climate: response.data.results[0].climate,
      terrain: response.data.results[0].terrain,
      movie_apparitions: response.data.results[0].films.length
    }

    return swapiPlanetReturn
  }
}
