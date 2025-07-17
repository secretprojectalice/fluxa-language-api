import { Request, Response } from "express"
import LanguageItem from "../models/LanguageItem"
import { shuffleArray } from '../utils/array'

export const getGuessExercise = async (req: Request, res: Response) => {
    try {
        const items = await LanguageItem.aggregate([
            {
                $sample: { size: 4 }
            }
        ])

        if (items.length === 0) {
            return res.status(404).json({ error: "No language items found " })
        }

        const options = shuffleArray([...items.map(item => item.translation)])
        const result = {
            testItem: items[0].content,
            options
        }

        res.json(result)
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

export const checkGuessExercise = async (req: Request, res: Response) => {
    const { content, answer } = req.body

    try {
        if (!content || !answer) {
            throw new Error("Both initial phrase and answer must be provided to check this exercise")
        }

        const item = await LanguageItem.findOne({ content })

        if (!item) {
            return res.status(404).json({ error: "Language item not found for the provided content" })
        }

        const result = {
            ok: item.translation === answer,
            correctAnswer: item.translation
        }

        res.json(result)
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}