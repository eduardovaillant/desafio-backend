import { Router } from 'express'
import { adaptRoute } from '../adapters'
import { makeAddPlanetController } from '../factories/controllers'

const router = Router()

// TODO integration tests
router.post('/planets', adaptRoute(makeAddPlanetController()))

export default router
