"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { StoreProduct } from "./store-data"

export interface CartItem {
  product: StoreProduct
  quantity: number
}

export interface StoreOrderCustomer {
  fullName: string
  phone: string
  email: string
  deliveryDate: string
  deliveryTime: string
  destination: string
  reservationNumber?: string
  notes?: string
}

export interface StoreOrder {
  id: string
  items: CartItem[]
  totalAmount: number
  totalItems: number
  customer: StoreOrderCustomer
  createdAt: string
  status: "confirmed"
}

interface StoreContextType {
  cart: CartItem[]
  addToCart: (product: StoreProduct, quantity?: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
  totalItems: number
  totalAmount: number
  isCartOpen: boolean
  setIsCartOpen: (open: boolean) => void
  selectedProductForModal: StoreProduct | null
  setSelectedProductForModal: (product: StoreProduct | null) => void
  currentOrder: StoreOrder | null
  placeOrder: (customer: StoreOrderCustomer) => StoreOrder
}

const StoreContext = createContext<StoreContextType | undefined>(undefined)

const CART_STORAGE_KEY = "millan_store_cart_v1"
const ORDER_STORAGE_KEY = "millan_store_last_order_v1"

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProductForModal, setSelectedProductForModal] = useState<StoreProduct | null>(null)
  const [currentOrder, setCurrentOrder] = useState<StoreOrder | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY)
      if (savedCart) {
        setCart(JSON.parse(savedCart))
      }
      const savedOrder = localStorage.getItem(ORDER_STORAGE_KEY)
      if (savedOrder) {
        setCurrentOrder(JSON.parse(savedOrder))
      }
    } catch (e) {
      console.error("Failed to load store state from storage", e)
    } finally {
      setIsInitialized(true)
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (!isInitialized) return
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (e) {
      console.error("Failed to save cart to storage", e)
    }
  }, [cart, isInitialized])

  const addToCart = (product: StoreProduct, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, quantity }]
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.product.priceCOP * item.quantity,
    0
  )

  const placeOrder = (customer: StoreOrderCustomer): StoreOrder => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000)
    const orderId = `MIL-RES-${randomSuffix}`

    const order: StoreOrder = {
      id: orderId,
      items: [...cart],
      totalAmount,
      totalItems,
      customer,
      createdAt: new Date().toISOString(),
      status: "confirmed",
    }

    setCurrentOrder(order)
    try {
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(order))
    } catch (e) {
      console.error("Failed to save order to storage", e)
    }

    clearCart()
    return order
  }

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        totalAmount,
        isCartOpen,
        setIsCartOpen,
        selectedProductForModal,
        setSelectedProductForModal,
        currentOrder,
        placeOrder,
      }}
    >
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider")
  }
  return context
}
