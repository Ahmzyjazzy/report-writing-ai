
const baseUrl = import.meta.env.VITE_OPENAI_BASE_URL
const apiKey = import.meta.env.VITE_OPENAI_API_KEY

export default {
    openAi: {
        apiKey,
        baseUrl,
    }
}