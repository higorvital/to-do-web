import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import GlobalStyle from './styles/global';
import AppProvider from './hooks';

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <AppProvider>
        <Routes />
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
