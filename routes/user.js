import express from 'express'
import { postRequest, sendResponseWithTheRequestedCurrency } from './export-all.js'


export const userRouter = express.Router()





userRouter.get('/', sendResponseWithTheRequestedCurrency);
userRouter.post('/', postRequest);