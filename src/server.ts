import app from './app'

const PORT = process.env.PORT

if (!PORT) {
    throw new Error("Application port must be defined!")
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})