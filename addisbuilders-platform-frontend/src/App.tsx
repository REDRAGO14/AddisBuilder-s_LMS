import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { AppRoutes } from './routes';
import { Toaster } from 'sonner';

const AppContent: React.FC = () => {
  const { theme } = useTheme();

  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" richColors closeButton expand={false} theme={theme} />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <BrowserRouter>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </BrowserRouter>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
