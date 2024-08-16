import { createContext, useContext, useEffect, useState } from 'react';
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);


  useEffect(()=>{
     const cartData=localStorage.getItem('cart');
     console.log('cartData',cartData)
     if(cartData){
        setCart(cartData)
     }
  },[])

  const handleCartData = (item) => {
    const newData = [...cart, item];
    localStorage.setItem('cart', JSON.stringify(newData)); 
    setCart(newData);
  };

  return (
    <CartContext.Provider value={{ cart, setCart,handleCartData }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
