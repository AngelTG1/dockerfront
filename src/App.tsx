import Navigation from "./components/Navigation";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePages from "./pages/HomePages";
import LoginPages from "./pages/LoginPages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/auth";
import RegisterPage from "./pages/RegisterPage";
import AddProductForm from "./pages/AddProductForm";

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPages />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute isAllawed={isAuth}>
                <HomePages />
              </ProtectedRoute>
            }
          />

          <Route
            path="/form"
            element={
              <ProtectedRoute isAllawed={isAuth}>
                <AddProductForm />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
