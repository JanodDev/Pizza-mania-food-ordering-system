import { createContext, useContext, useReducer, useEffect } from 'react';

const cartContext = createContext();

const initialState = {
  cart: [],
  isLoading: false,
  error: null,
  total: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return {
        ...state,
        isLoading: true,
      };

    case 'cart/loaded':
      return {
        ...state,
        isLoading: false,
        cart: action.payload,
        total: calculateTotal(action.payload),
      };

    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case 'item/added':
      const existingItem = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      let updatedCart;

      if (existingItem) {
        updatedCart = state.cart.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        updatedCart = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      return {
        ...state,
        isLoading: false,
        cart: updatedCart,
        total: calculateTotal(updatedCart),
      };

    case 'item/removed':
      const newCart = state.cart.filter((item) => item.id !== action.payload);
      return {
        ...state,
        isLoading: false,
        cart: newCart,
        total: calculateTotal(newCart),
      };

    case 'quantity/increased':
      const increasedCart = state.cart.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      );
      return {
        ...state,
        cart: increasedCart,
        total: calculateTotal(increasedCart),
      };

    case 'quantity/decreased':
      const decreasedCart = state.cart.map((item) =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      );
      return {
        ...state,
        cart: decreasedCart,
        total: calculateTotal(decreasedCart),
      };

    case 'cart/cleared':
      return {
        ...state,
        cart: [],
        total: 0,
      };

    default:
      throw new Error('Unknown action type');
  }
}

function calculateTotal(cart) {
  return cart.reduce((sum, item) => {
    const itemTotal = item.price * item.quantity;
    return sum + itemTotal;
  }, 0);
}

function CartProvider({ children }) {
  const [{ cart, isLoading, error, total }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // Load cart from localStorage on initial render
  useEffect(function () {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      dispatch({ type: 'cart/loaded', payload: JSON.parse(storedCart) });
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(
    function () {
      localStorage.setItem('cart', JSON.stringify(cart));
    },
    [cart],
  );

  function addItem(item) {
    dispatch({ type: 'loading' });
    try {
      dispatch({ type: 'item/added', payload: item });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error adding the item to cart...',
      });
    }
  }

  function removeItem(itemId) {
    dispatch({ type: 'loading' });
    try {
      dispatch({ type: 'item/removed', payload: itemId });
    } catch (error) {
      dispatch({
        type: 'rejected',
        payload: 'There was an error removing the item from cart...',
      });
    }
  }

  function increaseQuantity(itemId) {
    dispatch({ type: 'quantity/increased', payload: itemId });
  }

  function decreaseQuantity(itemId) {
    dispatch({ type: 'quantity/decreased', payload: itemId });
  }

  function clearCart() {
    dispatch({ type: 'cart/cleared' });
  }

  function getItemQuantity(itemId) {
    return cart.find((item) => item.id === itemId)?.quantity || 0;
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        isLoading,
        error,
        total,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getItemQuantity,
        getTotalItems,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

function useCart() {
  const context = useContext(cartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

export { CartProvider, useCart };
