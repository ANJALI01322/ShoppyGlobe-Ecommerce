const fs = require('fs');
const cartJs = \`import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCart, updateQuantity, removeFromCart, addToCart } from '../redux/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import './Cart.css';
import { electronicsProducts } from '../data/electronicsData';
import { clothesProducts } from '../data/clothesData';
import { shoesProducts } from '../data/shoesData';
import { sportsProducts } from '../data/sportsData';
import { getProductReviews } from '../data/productReviews';

function StarRating({ rating = 0 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.floor(rating);
    const half = !filled && i === Math.ceil(rating) && rating % 1 >= 0.4;
    stars.push(
      <span key={i} className={\`cart-star \${filled ? 'star-full' : half ? 'star-half' : 'star-empty'}\`}>
        {filled ? '★' : half ? '⯨' : '☆'}
      </span>
    );
  }
  return <span className=\"cart-star-row\">{stars}</span>;
}

export function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items || []);
  const [showExplore, setShowExplore] = useState(true);

  useEffect(() => { window.scrollTo(0, 0); }, []);
  useEffect(() => {
    api.get('/cart').then((res) => {
      if (res.data && res.data.cart && Array.isArray(res.data.cart.items)) {
        dispatch(setCart(res.data.cart.items));
      }
    }).catch(() => {});
  }, [dispatch]);
\`;
fs.writeFileSync('src/components/Cart.jsx', cartJs);

console.log('Starting script');
