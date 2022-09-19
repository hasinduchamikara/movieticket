import { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';

// context
import AuthContext from '../store/auth-context';

// reducers
import { setCartData } from '../slices/movieSlice';

// util
import { getUserId } from '../util';

const useStyles = makeStyles({
  icon: {
    color: '#eb8334',
  },
  leftContainer: {
    display: 'flex',
    marginLeft: 'auto',
  },
  input: {
    width: '30px',
    marginLeft: '0.4rem',
  },
});

const Movie = ({ id, img, title, theater, show_time, price }) => {
  const dispatch = useDispatch();
  const { token } = useContext(AuthContext);
  const classes = useStyles();

  const [noOfTickets, setNoOfTickets] = useState(1);

  const noOfTicketChangeHandler = (event) => {
    setNoOfTickets(event.target.value);
  };

  const addToCartHandler = () => {
    getUserId(token).then((userId) => {
      const obj = {
        movie: id,
        title,
        img,
        no_of_tickets: noOfTickets,
        price: price,
        user: userId,
      };

      dispatch(setCartData(obj));
    });
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="194" image={img} alt="img" />
      <CardContent>
        <Typography variant="subtitle1">{title}</Typography>
        <Typography variant="subtitle2">{theater}</Typography>
        <Typography variant="subtitle2">{show_time}</Typography>
        <Typography variant="subtitle2">Rs {price}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={addToCartHandler}>
          <AddCircle className={classes.icon} />
        </IconButton>
        <div className={classes.leftContainer}>
          <Typography variant="body2">No of tickets</Typography>
          <input
            type="number"
            value={noOfTickets}
            onChange={noOfTicketChangeHandler}
            className={classes.input}
          />
        </div>
      </CardActions>
    </Card>
  );
};

export default Movie;
