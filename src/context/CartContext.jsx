import { createContext, useContext, useState } from "react";
import { getProductbyId } from "../data/product";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext(null);

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // {id: 1, quantity: 2}

  function addToCart(productId) {
    const existingItem = cartItems.find((item) => item.id === productId);
    if (existingItem) {
      const currentQuantity = existingItem.quantity;
      const updatedCartItems = cartItems.map((item) =>
        item.id === productId
          ? { id: productId, quantity: currentQuantity + 1 }
          : item,
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  }

  function getCartItemsWithProduct() {
    return cartItems
      .map((item) => ({
        ...item,
        product: getProductbyId(item.id),
      }))
      .filter((item) => item.product);
  }

  function removeFromCart(productId) {
    setCartItems(cartItems.filter((item) => item.id !== productId));
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(
      cartItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function getCartTotal() {
    const total = cartItems.reduce((total, item) => {
      const product = getProductbyId(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);

    return total;
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        getCartItemsWithProduct,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);

  return context;
}
