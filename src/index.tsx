import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';

import GlobalStyle from '@styles/GlobalStyle';
import ThemeProvider from '@utils/ThemeProvider';

// components
import ErrorBoundary from '@utils/ErrorBoundary';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// react-query
const queryClient = new QueryClient();

root.render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary>
        <ThemeProvider>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </ErrorBoundary>
    </QueryClientProvider>
  </React.Fragment>
);

reportWebVitals();
