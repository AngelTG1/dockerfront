import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePages from "./pages/HomePages";
import LoginPages from "./pages/LoginPages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthStore } from "./store/auth";
import RegisterPage from "./pages/RegisterPage";
import AddProductForm from "./pages/AddProductForm";
import Quiz from "./components/Quiz";

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

          <Route
            path="/quizz"
            element={
              <ProtectedRoute isAllawed={isAuth}>
                <Quiz/>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
