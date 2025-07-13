import { v4 as uuid } from "uuid"
import mongoose from "mongoose"

const LanguageItemSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        default: uuid,
    },
    content: String,
    translation: String,
    example: {
        type: String,
        required: false,
    },
    itemType: {
        type: String,
        enum: [
            "word",
            "phrasal_verb",
            "idiom",
            "phrase"
        ],
        default: "word"
    },
    sourceLanguage: {
        type: String,
        enum: ["en", "uk"],
        default: "en"
    },
    targetLanguage: {
        type: String,
        enum: ["en", "uk"],
        default: "uk"
    },
    createdAt: Number,
    updatedAt: {
        type: Number,
        default: Date.now,
    }
})

export default mongoose.model("LanguageItem", LanguageItemSchema)