import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query';

import GlobalStyle from '@styles/GlobalStyle';
import ThemeProvider from '@utils/ThemeProvider';
import Modal from '@components/core/Modal';

import { ErrorBoundary } from 'react-error-boundary';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// react-query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      useErrorBoundary: true,
      retry: 0,
    },
    mutations: {
      useErrorBoundary: false,
      retry: 0,
    },
  },
});

root.render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalStyle />
        <App />
        <Modal />
      </ThemeProvider>
    </QueryClientProvider>
  </React.Fragment>
);

reportWebVitals();
