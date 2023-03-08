import axios from "axios"

const TOKEN = "cg28p3pr01qq9k4968v0cg28p3pr01qq9k4968vg"
export default axios.create({
  baseURL: "https://finnhub.io/api/v1",
  params: {
    token: TOKEN
  }
})