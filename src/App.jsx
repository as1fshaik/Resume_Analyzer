import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes';
import { AnalysisProvider } from './context/AnalysisContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <AnalysisProvider>
        <RouterProvider router={router} />
      </AnalysisProvider>
    </AuthProvider>
  );
}
