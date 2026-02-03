
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const mount = () => {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};

// On s'assure que le DOM est prêt, surtout avec une compilation asynchrone
if (document.readyState === 'complete') {
  mount();
} else {
  window.addEventListener('load', mount);
}
