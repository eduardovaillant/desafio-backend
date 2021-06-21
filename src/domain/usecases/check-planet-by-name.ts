export interface CheckPlanetByName {
  checkByName: (name: string) => Promise<boolean>
}
