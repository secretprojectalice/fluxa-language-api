import { Router } from "express"
import {
    createLanguageItem,
    getLanguageItems,
    getLanguageItemById,
    updateLanguageItem,
    deleteLanguageItem
} from "../controllers/languageItemController"

const router = Router()

router.post("/items", createLanguageItem)
router.get("/items", getLanguageItems)
router.get("/items/:id", getLanguageItemById)
router.put("/items/:id", updateLanguageItem)
router.delete("/items/:id", deleteLanguageItem)

export default router 