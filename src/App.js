import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item
  removeCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: [...filteredList]})
  }

  addCartItem = product => {
    const {cartList} = this.state

    let isFound = false

    if (cartList.length > 0) {
      cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          isFound = true
        }
        return null
      })
    }

    if (isFound) {
      const modifiedList = cartList.map(eachItem => {
        if (eachItem.id === product.id) {
          const modifiedData = {
            ...eachItem,
            quantity: eachItem.quantity + product.quantity,
          }
          return modifiedData
        }
        return eachItem
      })

      this.setState({cartList: [...modifiedList]})
    } else {
      this.setState({cartList: [...cartList, product]})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    let modifiedList = []

    const item = cartList.find(eachItem => eachItem.id === id)
    if (item.quantity === 1) {
      modifiedList = cartList.filter(eachItem => eachItem.id !== id)
    } else {
      modifiedList = cartList.map(eachItem => {
        if (eachItem.id === id) {
          const modifiedData = {
            ...eachItem,
            quantity: eachItem.quantity - 1,
          }
          return modifiedData
        }
        return eachItem
      })
    }

    this.setState({cartList: [...modifiedList]})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const modifiedList = cartList.map(eachItem => {
      if (eachItem.id === id) {
        const modifiedData = {
          ...eachItem,
          quantity: eachItem.quantity + 1,
        }
        return modifiedData
      }
      return eachItem
    })

    this.setState({cartList: [...modifiedList]})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
