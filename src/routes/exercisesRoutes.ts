import { Router } from "express"
import { checkGuessExercise, getGuessExercise } from '../controllers/exercisesController'

const router = Router()

router.get("/exercises/guess", getGuessExercise)
router.post("/exercises/guess", checkGuessExercise)

export default router 