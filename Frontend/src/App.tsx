import "./index.css";
import React from "react";
import {
  AuthenticateWithRedirectCallback,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Routes, Route } from "react-router";
import HomePage from "./home/HomePage.tsx";
import AuthCallbackPage from "./pages/AuthCallbackPage.tsx";
import MainLayout from "./Layouts/MainLayout.tsx";
import ChatPage from "./pages/Chat/ChatPage.tsx";
import AlbumPage from "./pages/AlbumPage.tsx";
import AudioPlayer from "./components/AudioPlayer.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AdminPage from "./admin/adminPage.tsx";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <>
    
      <Routes>
        <Route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signUpForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/audioplayer" element={<AudioPlayer />} />
          <Route path="/album/:albumId" element={<AlbumPage />}/>
          <Route path="/chat" element={<ChatPage />}/>
        </Route>

        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
