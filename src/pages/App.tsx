import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginComponent from '../components/LoginComponant';
import RegisterComponent from '../components/RegisterComposant';
import { useUserContext } from '../context/authcontext';
import { ApiProvider } from '../context/envar';
import Main from './Main';

function App() {
  const { user } = useUserContext();

  if (!user) {
    return (
      <Router>
        <ApiProvider>
          <Routes>
            <Route path="*" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
          </Routes>
        </ApiProvider>
      </Router>
    )
  }
  return (
    <Router>
      <ApiProvider>
        <Routes>
            <Route path="*" element={<Main />} />
        </Routes>
      </ApiProvider>

    </Router>
  );
}

export { App };
