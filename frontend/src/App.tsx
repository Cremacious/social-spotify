import { Routes, Route } from 'react-router';
import HomePage from './pages/home/Homepage';
import AuthCallbackPage from './pages/auth-callback/AuthCallbackPage';
import { AuthenticateWithRedirectCallback } from '@clerk/clerk-react';
// import { axiosInstance } from './lib/axios';

function App() {
  // const fetchSomeData = async () => {
  //   await axiosInstance.get('/users', {
  //     headers: {
  //       "Authorization": `Bearer ${token}`
  //     }
  //   });
  // };
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback signUpForceRedirectUrl={"/auth-callback"} />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
      </Routes>
    </>
  );
}

export default App;
