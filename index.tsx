
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Impossible de trouver l'élément root");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Erreur lors du rendu de l'application:", error);
    rootElement.innerHTML = `<div style="color: white; padding: 20px; text-align: center;">Une erreur est survenue lors du chargement de l'interface.</div>`;
  }
};

mountApp();
