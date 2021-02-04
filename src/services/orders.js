import axios from "axios";

const clientApi = axios.create({
  withCredentials: false,
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default async function getOrders() {
  return clientApi.get('/orders')
}
