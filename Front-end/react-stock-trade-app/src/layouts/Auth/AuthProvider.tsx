import { AuthProvider } from './AuthContext';
import App from '../../App';
import React from 'react';

function Root() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default Root;
