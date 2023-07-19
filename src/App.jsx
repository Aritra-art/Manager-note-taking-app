import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/auth/Login";
import { Signup } from "./pages/auth/Signup";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Profile } from "./pages/Profile";
import { ForgetPassword } from "./components/ForgetPassword";
import { Layout } from "./components/Layout";
import { Label } from "./pages/Label";
import { Archive } from "./pages/Archive";
import { Trash } from "./pages/Trash";
import { Toaster } from "react-hot-toast";
import { Welcome } from "./pages/Welcome";

function App() {
  return (
    <div className="App">
      <Toaster
        position="bottom-right"
        reverseOrder={false}
        containerStyle={{
          bottom: "3rem",
          right: "3rem",
        }}
      />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Layout>
                <Home />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/label"
          element={
            <ProtectedRoute>
              <Layout>
                <Label />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/archive"
          element={
            <ProtectedRoute>
              <Layout>
                <Archive />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/trash"
          element={
            <ProtectedRoute>
              <Layout>
                <Trash />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgetPassword />} />
      </Routes>
    </div>
  );
}

export default App;
