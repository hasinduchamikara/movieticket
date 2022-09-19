import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

// components
import TextField from './TextField';
import Button from './Button';

// actions
import { fetchTheaters, addMovie, updateMovie } from '../actions/movieActions';

const movieForm = [
  {
    label: 'Movie name',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Cast',
    name: 'cast',
    type: 'text',
  },
  {
    label: 'Banner',
    name: 'banner',
    type: 'text',
  },
  {
    label: 'Theater',
    name: 'theater',
    type: 'dropdown',
  },
  {
    label: 'Show Time',
    name: 'show_time',
    type: 'text',
  },
  {
    label: 'Price',
    name: 'price',
    type: 'text',
  },
];

const MovieForm = () => {
  const dispatch = useDispatch();

  const [movie, setMovie] = useState({
    name: '',
    cast: '',
    banner: '',
    theater: '',
    show_time: '',
    price: 0.0,
  });

  const theaterOptions = useSelector(
    (state) => state.movie.getTheatersData.data
  );
  const selected = useSelector((state) => state.movie.selectedMovie);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    setMovie((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (movie.name.trim() === '') {
      return;
    }
    if (movie.banner.trim() === '') {
      return;
    }
    if (movie.cast.trim() === '') {
      return;
    }
    if (movie.theater.trim() === '') {
      return;
    }
    if (movie.price === 0) {
      return;
    }


    if (selected !== null) {
      dispatch(updateMovie({ id: selected._id, ...movie}));
      return;
    }

    dispatch(addMovie(movie));
  };

  useEffect(() => {
    dispatch(fetchTheaters());
  }, [dispatch]);

  useEffect(() => {
    if (selected) {
      setMovie({
        name: selected.name,
        banner: selected.banner,
        cast: selected.cast,
        theater: selected.theater[0]._id,
        show_time: selected.show_time,
        price: selected.price,
      });
    }
  }, [selected]);

  const buttonLabel = selected !== null ? 'Update' : 'Add';

  return (
    <form onSubmit={formSubmitHandler}>
      <Grid container spacing={2}>
        {movieForm.map((item, index) => {
          if (item.type === 'dropdown') {
            return (
              <Grid key={index} item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    {item.label}
                  </InputLabel>
                  <Select
                    fullWidth
                    name={item.name}
                    label={item.label}
                    value={movie[item.name]}
                    onChange={onChangeHandler}
                  >
                    <MenuItem value="">None</MenuItem>
                    {theaterOptions.map((theater) => (
                      <MenuItem key={theater._id} value={theater._id}>
                        {theater.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            );
          }
          return (
            <Grid key={index} item xs={12}>
              <TextField
                label={item.label}
                name={item.name}
                value={movie[item.name]}
                onChange={onChangeHandler}
              />
            </Grid>
          );
        })}
        <Grid item xs={6} />
        <Grid item xs={6}>
          <Button label={buttonLabel} />
        </Grid>
      </Grid>
    </form>
  );
};

export default MovieForm;
