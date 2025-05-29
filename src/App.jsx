import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import UserHomePage from "./pages/UserHomePage";
import BookingPage from "./pages/BookingPage";
import UserBookingListPage from "./pages/UserBookingListPage";
import ProviderHomePage from "./pages/ProviderHomePage";
import CreateSlotPage from "./pages/CreateSlotPage";
import ProviderSlotListPage from "./pages/ProviderSlotListPage";
import ViewAppointmentsPage from "./pages/ViewAppointmentsPage";
import { useAuth } from "./context/AuthContext";

const ProtectedRoute = ({ role, children }) => {
  const { authenticated, userType, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!authenticated || userType !== role) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* User Routes */}
        <Route
          path="/home/user"
          element={
            <ProtectedRoute role="user">
              <UserHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking"
          element={
            <ProtectedRoute role="user">
              <BookingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list"
          element={
            <ProtectedRoute role="user">
              <UserBookingListPage />
            </ProtectedRoute>
          }
        />

        {/* Provider Routes */}
        <Route
          path="/home/provider"
          element={
            <ProtectedRoute role="provider">
              <ProviderHomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/createslot"
          element={
            <ProtectedRoute role="provider">
              <CreateSlotPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/list"
          element={
            <ProtectedRoute role="provider">
              <ProviderSlotListPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/provider/appointments"
          element={
            <ProtectedRoute role="provider">
              <ViewAppointmentsPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
