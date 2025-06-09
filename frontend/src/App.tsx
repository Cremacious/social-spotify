import { Routes, Route } from 'react-router';
import HomePage from './pages/home/Homepage';
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage';
import { axiosInstance } from './lib/axios';

function App() {
  const fetchSomeData = async () => {
    await axiosInstance.get('/users', {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
      </Routes>
    </>
  );
}

export default App;
