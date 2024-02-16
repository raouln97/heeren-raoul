import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import { ThemeProvider } from '@emotion/react';
import { theme } from './theme';
import { FlyingImagePage } from './pages/FlyingImagePage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/:id" element={<MainPage />} />
          <Route path="/all" element={<FlyingImagePage />} />
          {/* <Route path="/bank" element={<UserApplications context={{isAdmin: true}}/>} */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
