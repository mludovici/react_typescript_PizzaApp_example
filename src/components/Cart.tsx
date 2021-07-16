import React, { Component } from 'react'
import CartCSS from '../styles/Cart.module.css'
import { FiShoppingCart } from 'react-icons/fi'
import { AppStateContext } from './AppState'
import { createRef } from 'react'

interface Props {}

interface State {
	isOpen: boolean
}

export class Cart extends Component<Props, State> {
	#containerRef: React.RefObject<HTMLDivElement>

	constructor(props: Props) {
		super(props)
		this.state = {
			isOpen: false,
		}
		this.#containerRef = createRef()
	}

	handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		// if((e.target as HTMLElement).nodeName === 'SPAN') {
		// 	(e.target as HTMLSpanElement);
		// }
		this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
	}

	handleOutsideClick = (e: MouseEvent) => {
		if (
			//Check if the element clicked is outside the cart element (and then close the cart), otherwise dont close
			this.#containerRef.current &&
			!this.#containerRef.current.contains(e.target as Node)
		)
			this.setState({ isOpen: false })
	}

	componentDidMount() {
		document.addEventListener('mousedown', this.handleOutsideClick)
	}

	componentWillUnmount() {
		document.removeEventListener('mousedown', this.handleOutsideClick)
	}

	render() {
		return (
			<AppStateContext.Consumer>
				{(state) => {
					const itemCount = state.cart.items.reduce((sum, item) => {
						return sum + item.quantity
					}, 0)
					return (
						<div
							className={CartCSS.cartContainer}
							ref={this.#containerRef}
						>
							<button
								className={CartCSS.button}
								type='button'
								onClick={this.handleClick}
							>
								<FiShoppingCart />
								<span>{itemCount}</span>
							</button>
							<div
								className={CartCSS.cartDropDown}
								style={{
									display: this.state.isOpen
										? 'block'
										: 'none',
								}}
							>
								<ul>
									{state.cart.items.map((item) => {
										return (
											<li key={item.id}>
												{item.name} &times;{' '}
												{item.quantity}
											</li>
										)
									})}
								</ul>
							</div>
						</div>
					)
				}}
			</AppStateContext.Consumer>
		)
	}
}

export default Cart
