import { createContext, useContext, useState } from 'react';

// TODO:: build our provider
const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // this is our own custom provider - we will store data (state) and functionality (updaters) in here and whole app can access via consumer
  // we will stick this in a high level area (ex. _app.js or page.js)
  const [cartOpen, setCartOpen] = useState(false);

  // adding very simple functions to expose to state provider for global access
  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  function closeCart() {
    setCartOpen(false);
  }

  function openCart() {
    setCartOpen(true);
  }

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

// make a custom hook for accessing the cqrt local state
function useCart() {
  // consumer end to access local state provided by provider
  const all = useContext(LocalStateContext);
  return all;
}
export { CartStateProvider, useCart };
