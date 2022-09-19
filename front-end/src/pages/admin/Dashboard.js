import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { AddCircle as AddCircleIcon, Edit as EditIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { makeStyles } from '@mui/styles';

// components
import Dialog from '../../components/Dialog';
import MovieForm from '../../components/MovieForm';

// actions
import { fetchMovies, deleteMovie } from '../../actions/movieActions';
import { setModal, setSelectedMovie, deleteMovieReset, updateMovieReset } from '../../slices/movieSlice';

const columns = [
  { field: 'name', headerName: 'Movie', width: 130 },
  { field: 'cast', headerName: 'Cast', width: 200 },
  {
    field: 'banner',
    headerName: 'Banner',
    width: 180,
    renderCell: (params) => (
      <img style={{ width: '50px' }} src={params.value} alt={params.row._id} />
    ),
  },
  {
    field: 'theater',
    headerName: 'Theater',
    width: 180,
    valueGetter: (params) => {
      return `${params.row.theater[0].name || ''}`;
    },
  },
  { field: 'price', headerName: 'Price', width: 130 },
];

const useStyles = makeStyles({
  addIcon: {
    color: '#eb8334',
    width: '40px',
    height: '40px',
  },
});

const Dashboard = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const open = useSelector((state) => state.movie.openModal);
  const rows = useSelector((state) => state.movie.movieData.data.movies);
  const addSuccess = useSelector((state) => state.movie.addMovieData.data);
  const deleteSuccess = useSelector((state) => state.movie.deleteMovieData.data);
  const updateSuccess = useSelector((state) => state.movie.updateMovieData.data);

  const openModalHandler = () => {
    dispatch(setModal(true));
  };

  const editModalHandler = (select) => {
    dispatch(setModal(true));
    dispatch(setSelectedMovie(select.row));
  };

  const closeModalHandler = () => {
    dispatch(setModal(false));
    dispatch(setSelectedMovie(null));
  };

  const deleteMovieHandler = (id) => {
    dispatch(deleteMovie(id));
  }

  useEffect(() => {
    dispatch(fetchMovies(''));
  }, [dispatch]);

  useEffect(() => {
    if (deleteSuccess) {
      dispatch(fetchMovies(''));
      dispatch(deleteMovieReset());
    }
  }, [dispatch, deleteSuccess]);

  useEffect(() => {
    if (updateSuccess) {
      dispatch(fetchMovies(''));
      dispatch(updateMovieReset());
      dispatch(setModal(false));
      dispatch(setSelectedMovie(null));
    }
  }, [dispatch, updateSuccess]);

  useEffect(() => {
    if (addSuccess) {
      dispatch(setModal(false));
      dispatch(fetchMovies(''));
    }
  }, [dispatch, addSuccess]);

  const data_columns = [
    ...columns,
    {
      field: 'edit',
      headerName: '',
      width: 130,
      renderCell: (params) => (
        <IconButton onClick={editModalHandler.bind(null, params)}>
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: 'delete',
      headerName: '',
      width: 130,
      renderCell: (params) => (
        <IconButton onClick={deleteMovieHandler.bind(null, params.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <IconButton sx={{ float: 'right' }} onClick={openModalHandler}>
          <AddCircleIcon className={classes.addIcon} />
        </IconButton>
      </Grid>
      <Grid item xs={12} p={2}>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            columns={data_columns}
            rows={rows || []}
            getRowId={(row) => row._id}
            hideFooter
          />
        </div>
      </Grid>
      <Dialog open={open} onCose={closeModalHandler} title="Movie">
        <MovieForm />
      </Dialog>
    </Grid>
  );
};

export default Dashboard;
