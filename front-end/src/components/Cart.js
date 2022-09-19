import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

// components
import CartItem from './CartItem';
import Button from './Button';

// actions
import { addToCart } from '../actions/movieActions';
import { cartDataReset, addToCartReset } from '../slices/movieSlice';
import Payment from './Payment';

const Cart = () => {
  const dispatch = useDispatch();

  const cartData = useSelector((state) => state.movie.cartData);
  const addToCartSuccess = useSelector(
    (state) => state.movie.addToCartData.data
  );

  const [isPayment, setIsPayment] = useState(false);

  const confirmHandler = (event) => {
    event.preventDefault();
    setIsPayment(true);

    if (!isPayment) return;

    dispatch(addToCart(cartData));
  };

  useEffect(() => {
    if (addToCartSuccess) {
      dispatch(cartDataReset());
      dispatch(addToCartReset());
      setIsPayment(false);
    }
  }, [addToCartSuccess, dispatch]);

  return (
    <form> 
      {!isPayment &&
        cartData.movies.length > 0 &&
        cartData.movies.map((movie) => (
          <CartItem
            key={movie.movie}
            img={movie.img}
            title={movie.title}
            no_of_tickets={movie.no_of_tickets}
          />
        ))}
      {isPayment && <Payment />}
      <Grid container>
        <Grid item xs={6}>
          <Typography>Total Rs {cartData.total_price}</Typography>
        </Grid>
        <Grid item xs={6}>
          {cartData.movies.length > 0 && (
            <Button
              label={isPayment ? 'Confirm' : 'Pay'}
              onClick={confirmHandler}
            />
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default Cart;
