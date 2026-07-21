import { RouterProvider } from 'react-router-dom';
import { router } from './routes/AppRoutes';
import { AnalysisProvider } from './context/AnalysisContext';

export default function App() {
  return (
    <AnalysisProvider>
      <RouterProvider router={router} />
    </AnalysisProvider>
  );
}
