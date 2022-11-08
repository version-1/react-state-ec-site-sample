import { configureStore } from '@reduxjs/toolkit'
import productsReducer from 'features/products'

export const store = configureStore({
  reducer: {
    products: productsReducer
  },
})
