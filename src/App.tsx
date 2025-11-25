import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './app/store';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Dispatch from './pages/Dispatch';
import Incidents from './pages/Incidents';
import Ambulances from './pages/Ambulances';
import Map from './pages/Map';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dispatch" element={<Dispatch />} />
              <Route path="incidents" element={<Incidents />} />
              <Route path="ambulances" element={<Ambulances />} />
              <Route path="map" element={<Map />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
