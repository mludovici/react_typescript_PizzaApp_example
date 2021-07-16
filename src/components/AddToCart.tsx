import React from 'react'
import { CartItem, useStateDispatch } from './AppState'

export interface AddToCartProps {
	addToCart: (item: Omit<CartItem, 'quantity'>) => void
}

export const WithAddToCartProps: React.FC<{
	children: (props: AddToCartProps) => JSX.Element
}> = ({ children }) => {
	const dispatch = useStateDispatch()

	const addToCart: AddToCartProps['addToCart'] = (item) => {
		dispatch({
			type: 'ADD_TO_CART',
			payload: {
				item: item,
			},
		})
	}
	return children({ addToCart })
}

export const useAddToCart = () => {
	const dispatch = useStateDispatch()
	const addToCart: AddToCartProps['addToCart'] = (item) => {
		dispatch({
			type: 'ADD_TO_CART',
			payload: {
				item,
			},
		})
	}
	return addToCart
}
