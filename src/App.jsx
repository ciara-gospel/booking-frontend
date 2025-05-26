import React, { useState } from "react";
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

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userType, setUserType] = useState(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      return JSON.parse(storedUser).role || null;
    }
    return null;
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setAuthenticated(true);
      setUserType(JSON.parse(storedUser).role);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/login"
          element={
            <LoginPage
              setAuthenticated={setAuthenticated}
              setUserType={setUserType}
            />
          }
        />

        {/* User Routes */}
        <Route
          path="/home/user"
          element={userType === "user" ? <UserHomePage /> : <Navigate to="/" />}
        />
        <Route
          path="/booking"
          element={userType === "user" ? <BookingPage /> : <Navigate to="/" />}
        />
        <Route
          path="/list"
          element={
            userType === "user" ? <UserBookingListPage /> : <Navigate to="/" />
          }
        />

        {/* Provider Routes */}
        <Route
          path="/home/provider"
          element={
            userType === "provider" ? <ProviderHomePage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/createslot"
          element={
            userType === "provider" ? <CreateSlotPage /> : <Navigate to="/" />
          }
        />
        <Route
          path="/provider/list"
          element={
            userType === "provider" ? (
              <ProviderSlotListPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/provider/appointments"
          element={
            userType === "provider" ? (
              <ViewAppointmentsPage />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
