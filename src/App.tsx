import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainPage />}
          />
          {/* <Route path="/bank" element={<UserApplications context={{isAdmin: true}}/>} */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
