export interface CheckPlanetByNameRepository {
  checkByName: (name: string) => Promise<boolean>
}
