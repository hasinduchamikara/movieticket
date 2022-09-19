import { Route, Routes } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

// components
import Header from './components/Header';

// pages
import Home from './pages/home/Home';
import Dashboard from './pages/admin/Dashboard';

import AdminRoute from './router/AdminRoute';

const useStyles = makeStyles({
  pageContainer: {
    padding: '0px 10px 0px 10px',
    marginTop: '90px',
  },
});

const Layout = (props) => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <div className={classes.pageContainer}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Dashboard />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default Layout;
