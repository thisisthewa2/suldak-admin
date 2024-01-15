import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '@utils/QueryClient';

import GlobalStyle from '@styles/GlobalStyle';
import ThemeProvider from '@utils/ThemeProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.Fragment>
);

reportWebVitals();
