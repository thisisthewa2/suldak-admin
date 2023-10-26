import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import GlobalStyle from '@styles/GlobalStyle';
import ThemeProvider from '@layouts/ThemeProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.Fragment>
    <ThemeProvider>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.Fragment>
);

reportWebVitals();
