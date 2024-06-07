// Write your code here

import './index.css'

import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      let totalOrderValue = 0

      cartList.map(eachItem => {
        totalOrderValue += eachItem.price * eachItem.quantity
        return null
      })

      const totalItems = cartList.length

      return (
        <div className="mainContainer">
          <div className="summaryContainer">
            <p className="orderTotalPara">
              Order Total:{' '}
              <span className="orderTotalSpan">{`Rs ${totalOrderValue}/-`}</span>
            </p>
            <p className="itemsCountPara">{`${totalItems} Items in cart`}</p>
          </div>
          <button className="checkoutButton" type="button">
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
