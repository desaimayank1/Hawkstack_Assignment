import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import { useStore } from "./store/store";

function App() {
  const currentPage = useStore((state) => state.currentPage);
  return (
    <>
       {currentPage === "login" ? <LoginPage /> : <Dashboard />}
    </>
  );
}

export default App;
