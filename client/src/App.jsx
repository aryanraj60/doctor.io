import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  RegisterPage,
  LoginPage,
  ApplyDoctor,
  NotificationPage,
  Doctors,
  Users,
  BookAppointment,
  DocProfile,
  Appointments,
  DocAppointment,
  UserProfile,
  LandingPage,
} from "./pages";
import { ToastContainer } from "react-toastify";
import Spinner from "./components/Spinner";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const { loading } = useSelector((state) => state.loading);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/apply-doctor"
          element={
            <ProtectedRoute>
              <ApplyDoctor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/book-appointment/:id"
          element={
            <ProtectedRoute>
              <BookAppointment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <NotificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />
        {/* doctor Routes       */}
        <Route
          path="/doctor/profile/:id"
          element={
            <ProtectedRoute>
              <DocProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute>
              <DocAppointment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
