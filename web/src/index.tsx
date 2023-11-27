import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyle from './styles';
import App from './App/App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <>
    <GlobalStyle />

    <App />
  </>
);
