import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoginPage } from "@/pages/LoginPage.jsx";
import { MatchmakingPage } from "@/pages/MatchmakingPage.jsx";
import { MeetingRequestsPage } from "@/pages/MeetingRequestsPage.jsx";
import { RegistrationPage } from "@/pages/RegistrationPage.jsx";
import { InvitationRegistrationPage } from "@/pages/InvitationRegistrationPage.jsx";
import { HomePage } from "@/pages/HomePage.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/register/invitation/:token" element={<InvitationRegistrationPage />} />
      <Route path="/" element={<HomePage />} />

      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/matchmaking" element={<MatchmakingPage />} />
          <Route path="/meeting-requests" element={<MeetingRequestsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/matchmaking" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
