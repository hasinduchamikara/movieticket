import { ThemeProvider } from '@mui/system';
import Layout from './Layout';
import AuthProvider from './store/auth-provider';

// theme
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
