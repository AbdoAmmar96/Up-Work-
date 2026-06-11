import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL || '/api'

const client = axios.create({
  baseURL,
  headers: { Accept: 'application/json' },
  timeout: 12000,
})

export default client
