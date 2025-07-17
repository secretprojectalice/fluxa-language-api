import { Request, Response } from "express"
import LanguageItem from "../models/LanguageItem"

export const createLanguageItem = async (req: Request, res: Response) => {
    try {
        const item = new LanguageItem({
            ...req.body,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        })
        await item.save()
        res.status(201).json(item)
    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
}

export const getLanguageItems = async (req: Request, res: Response) => {
    try {
        // await new Promise(resolve => setTimeout(resolve, 2000))

        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const skip = (page - 1) * limit
        const search = req.query.search as string

        let searchQuery = {}
        if (search && search.trim()) {
            const searchRegex = new RegExp(search.trim(), 'i') // Case-insensitive search
            searchQuery = {
                $or: [
                    { content: searchRegex },
                    { translation: searchRegex }
                ]
            }
        }

        const [items, total] = await Promise.all([
            LanguageItem.find(searchQuery).sort({ createdAt: -1 }).skip(skip).limit(limit),
            LanguageItem.countDocuments(searchQuery)
        ])

        res.json({
            items,
            total
        })
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

export const getLanguageItemById = async (req: Request, res: Response) => {
    try {
        const item = await LanguageItem.findOne({ id: req.params.id })
        if (!item) return res.status(404).json({ error: "Not found" })
        res.json(item)
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
}

export const updateLanguageItem = async (req: Request, res: Response) => {
    try {
        const item = await LanguageItem.findOneAndUpdate(
            { id: req.params.id },
            { ...req.body, updatedAt: Date.now() },
            { new: true }
        )
        if (!item) return res.status(404).json({ error: "Not found" })
        res.json(item)
    } catch (error) {
        res.status(400).json({ error: (error as Error).message })
    }
}

export const deleteLanguageItem = async (req: Request, res: Response) => {
    try {
        const item = await LanguageItem.findOneAndDelete({ id: req.params.id })
        if (!item) return res.status(404).json({ error: "Not found" })
        res.status(204).send()
    } catch (error) {
        res.status(500).json({ error: (error as Error).message })
    }
} 