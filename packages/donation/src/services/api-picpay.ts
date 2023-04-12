import axios from 'axios'

export const apiPicpayService = axios.create({
  baseURL: 'https://appws.picpay.com/ecommerce/public/payments',
  headers: {
    'x-picpay-token': process.env.PICPAY_TOKEN,
    'Content-Type': 'application/json',
  },
}) 